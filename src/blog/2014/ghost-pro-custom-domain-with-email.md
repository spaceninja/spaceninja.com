---
title: How to use Ghost Pro with a custom domain and keep your email
slug: ghost-pro-custom-domain-with-email
date: 2014-05-02T15:38:09.000Z
date_updated: 2022-02-16T16:17:40.000Z
tags:
  - ghost
  - email
  - dns
excerpt: When I switched my blog to a hosted Ghost Pro plan, I ran into some difficulty getting the proper DNS configuration. I'm not a networking guru, so I figured there might be others who could benefit from what I learned.
feature_image: /images/feature/ghost-logo.jpg
---

**💡 Update: August, 2021** — This post is seven years old at this point, and I can no longer vouch for the information. I'll leave it up in case it's helpful, but if you have difficulties, I encourage you to reach out to the Ghost support team, who are very helpful.

**Update: July 16, 2014** -- John with Ghost just emailed me:

> I just wanted to let you know that [CloudFlare now supports root level CNAMEs](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root) on their free service _and_ email deliverability is unaffected!

> Maybe now your parents can email you again?

I switched from DNSimple to CloudFlare, and it works perfectly. Now my setup looks like this:

<table>
<tr>
<th>Record</th>
<th>Name</th>
<th>Target</th>
</tr>
<tr>
<td>CNAME</td>
<td>example.com</td>
<td>example.ghost.io</td>
</tr>
<tr>
<td>CNAME*</td>
<td>www</td>
<td>example.com</td>
</tr>
<tr>
<td>MX</td>
<td>example.com</td>
<td>aspmx.l.google.com</td>
</tr>
</table>

<small>\* Cloudflare doesn't seem to have <code>URL</code> or <code>FORWARD</code> records, so I've just added another <code>CNAME</code> for my <code>www</code> subdomain, which seems to be working fine.</small>

---

When I switched my blog to a [hosted Ghost Pro](https://ghost.org/pricing/) plan, I ran into some difficulty getting the proper DNS configuration. I'm not a <s>smart man</s> networking guru, so I figured there might be others who could benefit from what I learned.

<small>If you're not interested in all the DNS-101 stuff in this post, you can just [skip to the solution](#alias-provider).</small>

### What's so complicated?

A traditional DNS setup would involve an `A` record for your domain, which points to your hosting provider's IP address, and a series of `MX` records which point to your email provider. You can have `A` and `MX` records for the same domain name, like so:

<table>
<tr>
<th>Record</th>
<th>Name</th>
<th>Target</th>
</tr>
<tr>
<td>A</td>
<td>example.com</td>
<td>185.31.17.133</td>
</tr>
<tr>
<td>MX*</td>
<td>example.com</td>
<td>aspmx.l.google.com</td>
</tr>
</table>

<small>\* There would actually be several <code>MX</code> records, but for readability's sake, I've just left a single example here.</small>

When requests come in for your domain name, they get filtered by what type of traffic they are. Email gets sent to your `MX` records, and requests for web pages get sent to your `A` record.

#### What About www?

The part of your domain after the `www` is called the "root" or "apex" domain. The `www` part is a subdomain, and is defined as a separate DNS record.

If you want to add `www.example.com` as an alias for your domain (meaning visitors can access your site both via `example.com` and `www.example.com`) then you add a `CNAME` record for the `www` subdomain, like so:

<table>
<tr>
<th>Record</th>
<th>Name</th>
<th>Target</th>
</tr>
<tr>
<td>A</td>
<td>example.com</td>
<td>185.31.17.133</td>
</tr>
<tr>
<td>CNAME</td>
<td>www</td>
<td>example.com</td>
</tr>
<tr>
<td>MX</td>
<td>example.com</td>
<td>aspmx.l.google.com</td>
</tr>
</table>

A `CNAME` record is like an `A` record, except it points to another domain name instead of an IP address.

If you wanted to redirect all visitors on `www.example.com` to `example.com` instead, you'll need to set up a forwarding record. Most DNS providers support this functionality, though they call it different things.

<table>
<tr>
<th>Record</th>
<th>Name</th>
<th>Target</th>
</tr>
<tr>
<td>A</td>
<td>example.com</td>
<td>185.31.17.133</td>
</tr>
<tr>
<td>URL or FORWARD</td>
<td>www</td>
<td>example.com</td>
</tr>
<tr>
<td>MX</td>
<td>example.com</td>
<td>aspmx.l.google.com</td>
</tr>
</table>

#### How does cloud hosting make this more complex?

Cloud hosting providers — like Heroku, AWS, or Ghost Pro — don't allow you to point `A` records at an IP address on their servers, because they want the ability to [change your IP addresses for security or performance reasons](https://devcenter.heroku.com/articles/apex-domains). For this reason, cloud hosting providers tell you to create a `CNAME` record pointing to their server, like so:

<table>
<tr>
<th>Record</th>
<th>Name</th>
<th>Target</th>
</tr>
<tr>
<td>CNAME</td>
<td>example.com</td>
<td>example.ghost.io</td>
</tr>
<tr>
<td>URL or FORWARD</td>
<td>www</td>
<td>example.com</td>
</tr>
<tr>
<td>MX</td>
<td>example.com</td>
<td>aspmx.l.google.com</td>
</tr>
</table>

But there's a problem with this setup: The DNS specification doesn't allow any other records to coexist with a `CNAME` record. Since your `MX` records have to live on the root domain, some services will see a `CNAME` record on your root domain and ignore any further records you've defined, which means your email stops working!

To get around this, there are two options:

1. Subdomain Redirection
2. Use a DNS provider that supports `CNAME`-like functionality at the root domain

### Subdomain Redirection

This is pretty simple: You move the `CNAME` record from your root domain to the `www` subdomain and then forward all visitors to the subdomain, like so:

<table>
<tr>
<th>Record</th>
<th>Name</th>
<th>Target</th>
</tr>
<tr>
<td>URL or FORWARD</td>
<td>example.com</td>
<td>www.example.com</td>
</tr>
<tr>
<td>CNAME</td>
<td>www</td>
<td>example.ghost.io</td>
</tr>
<tr>
<td>MX</td>
<td>example.com</td>
<td>aspmx.l.google.com</td>
</tr>
</table>

This avoids the `CNAME` conflict on your root domain, but the disadvantage to this approach is it forces all visitors to your site onto the rather pointless `www` subdomain. Personally, I found this distasteful, and went for option 2:

### Use a DNS provider that supports CNAME-like functionality at the root domain

Some DNS providers have a way to get `CNAME`-like functionality for the root domain using a custom record type. Some examples include:

- [ALIAS at DNSimple](http://support.dnsimple.com/articles/alias-record)
- [ANAME at DNS Made Easy](http://www.dnsmadeeasy.com/technology/aname-records/)
- [ANAME at easyDNS](http://docs.easydns.com/aname-records/)
- [CNAME at CloudFlare](https://support.cloudflare.com/hc/en-us/articles/200169056-Does-CloudFlare-support-CNAME-APEX-at-the-root-)
- [ALIAS at PointDNS](https://devcenter.heroku.com/articles/pointdns)

For each provider, the setup is similar — you set the `ALIAS` or `ANAME` record for your root domain to point to your hosting provider's address, like so:

<table>
<tr>
<th>Record</th>
<th>Name</th>
<th>Target</th>
</tr>
<tr>
<td>ALIAS or ANAME</td>
<td>example.com</td>
<td>example.ghost.io</td>
</tr>
<tr>
<td>URL or FORWARD</td>
<td>www</td>
<td>example.com</td>
</tr>
<tr>
<td>MX</td>
<td>example.com</td>
<td>aspmx.l.google.com</td>
</tr>
</table>

#### There's one small catch

For most people, that setup should work just fine. It's a common pattern in use on many sites around the world. However, when I set that up for my domain, all of a sudden my parents couldn't send any email to me.

They could receive email from me just fine, and I could receive email from everyone else. But if they tried to email me, it would bounce with the following error:

> CNAME lookup failed temporarily. (#4.4.3)
> I'm not going to try again; this message has been in the queue too long.

When I emailed my DNS provider about this, they explained that the problem is almost certainly with my parent's email provider — [Juno.com](http://juno.com) — and there wasn't much we could do to fix the issue.

> As far as I can tell, the DNS configuration is fine and should work well. As for the specific bounces from Juno, it's possible that they're using a version of qmail that is buggy. I found [this thread](https://productforums.google.com/forum/#!topic/apps/mIGTQVZiFxo) which has an explanation in it, as well as [another bit of information](http://www.lifewithqmail.org/lwq.html#dns-problem) on the issue.

> Sorry, I'm not sure if there's much else I can offer. Given the number of customers that use the ALIAS and MX record together, I find it really hard to believe that the issue is something that is affecting a broad number of customers.

> I can't think of anything else we could do at this point, aside from contacting Juno directly and asking them if they have a solution (and politely suggesting they upgrade their mail systems).

So, in the end, that's where I left it. My `www` subdomain redirects to `spaceninja.com`, which is an `ALIAS` record to my Ghost blog, and my `MX` records are pointed to google. Everything is working perfectly — except I can't get email from my parents on my Spaceninja email. Now if I can just convince them to abandon Juno, everything will be perfect!

Did I get anything wrong? Feel free to [chat with me on Twitter](http://twitter.com/spaceninja)!

<aside>

I'm incredibly grateful to John and Hannah at Ghost who helped me get this all set up. One resource I found particularly helpful was [this reference article about custom domains on Heroku](https://devcenter.heroku.com/articles/custom-domains#root-domain) which applies equally to Ghost Pro.

</aside>
