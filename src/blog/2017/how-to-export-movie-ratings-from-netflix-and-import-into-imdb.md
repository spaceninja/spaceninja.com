---
title: How to Export Movie Ratings from Netflix and Import into IMDb
date: 2017-11-16T17:24:55.000Z
date_updated: 2018-09-18T05:12:00.000Z
tags:
  - php
  - ratings
  - movies
  - howto
feature_image: feature/popcorn.jpg
feature_source: https://unsplash.com/photos/ny-lHmsHYHk
feature_credit: Georgia Vagim
---

When Netflix switched from a 5-star rating scheme to a [thumbs up/down](https://www.theverge.com/2017/3/16/14952434/netflix-five-star-ratings-going-away-thumbs-up-down) model, I realized I was sitting on more than a decade of ratings, and worried they would disappear.

I started rating movies on Netflix because back then, ratings drove their recommendation engine. The more films you rated, the more fine-tuned the recommendations got. They had a little section of the page that just asked if you’d seen a random set of movies and asked you to rate them. Each time you rated one, it would be replaced with another. I used to sit there and rate movies until I didn’t recognize anything it was showing me.

That’s how I ended up with over 1300 ratings dating back to 2004 that I wanted to preserve. I spent some time researching and decided that I would transfer my ratings to IMDb. Of the movie-related websites, they seemed least likely to make a dramatic change or disappear overnight.

Unfortunately, there’s no simple process to transfer ratings out of Netflix. If you search, you’ll find references to an API that Netflix no longer offers, but let me save you some time: As of 2017, Netflix does not provide any way to export your ratings. The only thing they have is the [My Activity](https://www.netflix.com/MoviesYouveSeen) page, which lists every movie you’ve rated.

Similarly, IMDb does not offer any way to import movie ratings. Strangely, they do allow you to export your ratings to <abbr title="Comma Separated Value">CSV</abbr> format, but you can’t import anything, even IMDb’s own export files.

Thankfully, there is a way to get the job done if you’re comfortable with a bit of PHP code and command-line work.

_Disclaimer: this sort of process is inherently brittle. Netflix or IMDb could change something at any time that breaks these tools, and there’s nothing anyone can do about it. This is meant as a document of what worked for me, not bulletproof instructions for everyone. I can’t act as tech support. Follow these instructions at your own risk, etc. Good luck!_

## Export Your Ratings from Netflix

To get your ratings out of Netflix, you’ll need to grab the [Netflix Ratings Extractor](https://github.com/m5n/netflix-ratings-extractor) script, which can be installed as a browser extension in Chrome.

Once you install the extension, go to the [My Activity](https://www.netflix.com/MoviesYouveSeen) page on Netflix. The script will inject a large panel at the top of the page with a “Start” button.

When you start the process, the script will repeatedl scroll the browser window to the bottom of the page until all your movies have loaded. Then it converts your ratings to tab-separated values, displayed in a textbox. It’ll look like this:

```csv
ID	Title	Rating	Date
80025919	Mad Max: Fury Road	5	6/3/15
20557937	The Matrix	5	11/8/04
```

When the script has finished, you’ll want to copy the contents of that textbox to a new file, which you can name `netflix-ratings.csv`.

Good news! Even if you don’t get any further with these instructions, you’ve now got your ratings backed up. You can import this file into anything that understands tab-separated values, such as Excel or a Google Docs spreadsheet.

## Convert Your Exported Ratings to a PHP Array

The next step requires a PHP array of movie ratings. You’ll need to manually edit your CSV file to convert it to a PHP array, like this:

```php
<?php
return [
  [
    "title" => "Mad Max: Fury Road",
    "rating" => "5.0"
  ],
  [
    "title" => "The Matrix",
    "rating" => "5.0"
  ]
];
```

I had good luck using Sublime Text, but you can use any text editor that supports regex-based search and replace. Different editors handle this differently, but try searching for:

```
(.*?)\t(.*?)\t(.*?)\t(.*?)\n
```

and replace with:

```
[\n\t"title" => "$2",\n\t"rating" => "$3"\n],\n
```

That should change every movie rating to the proper format. Then you can manually clean up the start and end of the file.

Lastly, rename the file to `netflix-ratings.php`.

## Import Your Ratings to IMDb

For this, we’re going to use a PHP script called [IMDb ratings importer](https://github.com/tomzx/imdb-importer). To use it, you’ll need to install [Composer](https://getcomposer.org/), a dependency management tool for PHP.

Here are the commands I used on a Mac:

```bash
# download the imdb-importer project
git clone git@github.com:tomzx/imdb-importer.git

# switch to the project directory
cd imdb-importer/

# download the composer install script
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

# run the composer install script
php composer-setup.php

# remove the composer install script
php -r "unlink('composer-setup.php');"

# install the project dependencies
php composer.phar install

# create the script you'll run
touch runme.php
```

Now you need to edit `runme.php` to make it a PHP script that will load the importer, define the information it needs, and run it. Here’s an example:

```php
<?php
require_once 'vendor/autoload.php';
use ImdbImporter\\\\Importer;

$input = require_once 'netflix-ratings.php';
$id = 'YOUR-IMDb-ID-HERE';
$rating_base = 5;

$importer = new Importer($id, $rating_base);
$importer->submit($input);
```

Your IMDb ID can be found by logging into the IMDb website and then inspecting the login cookie. In Chrome, you can do this by going to Preferences > Advanced > Content Settings > Cookies > See all cookies and site data. Search for “imdb,” and look at the cookies for imdb.com. Open the cookie called “id” and the long string of characters in the “content” field is your IMDb ID. Copy that to the `$id` variable in your PHP script.

At this point, copy your `netflix-ratings.php` file into the project directory, so it’s available to the script.

Now you should be able to type `php runme.php` at the command line and see the script run. If your ratings array is broken somehow, it’ll let you know, but hopefully, you’ll start seeing output like this:

```shell
Searching for The Good Place
Submitting rating for {"title":"The Good Place","rating":"5.0"} tt4955642
Submitted rating for The Good Place
Searching for Marvel's Luke Cage
Could not find title "Marvel's Luke Cage"
Searching for BoJack Horseman
Submitting rating for {"title":"BoJack Horseman","rating":"5.0"} tt3398228
Submitted rating for BoJack Horseman
```

You’ll notice quite a few of those “could not find title” errors. Out of 1318 ratings, I got 238 errors — an error rate of 1.8%. These were all caused by Netflix having a slightly different title than IMDb. For example, Netflix had “Marvel’s Luke Cage,” while IMDb just has “Luke Cage.”

You can search on IMDb for the right title and modify your ratings array. But I figured if I was searching for them by hand anyway, I might as well rate them while I was there. It took about an hour for me to rate everything the importer script choked on.

### Alternate Method for Linux Users:

While searching for an IMDb importer, I found a promising project called [RatS](https://github.com/StegSchreck/RatS), which is short for “RATings Synchronisation.” It claims to be able to extract and import ratings to and from sites like IMDb, Flixter, and Trakt. You can’t use it to export from Netflix, but if you convert the CSV file we created earlier to JSON format, you _should_ be able to use that as a source.

However, RatS was written for Linux, and I couldn’t find a simple way to get it running on my Mac. It might be possible, but it was going to take more work than I wanted to invest in this project. Which might seem silly given everything I just wrote, but I have some PHP experience, so that approach was less intimidating to me.

## In Conclusion

Should you do this? Probably not. I’m not going to lie, it was a stupidly complicated process. If I hadn’t had over a decade’s worth of ratings that I wanted to preserve, I probably would have just walked away.

Weirdly, I had fun doing this. I got an old-school thrill trying to hack data from one source into other using tools that weren’t designed to do what I wanted. It reminded me of when I was getting started with computers. Nothing was documented or easy, and you had to beat your head against problems until you either cracked them or decided it wasn’t worth your time.

All told, I invested probably four hours into this over a couple mornings, and I was rapidly reaching the “walk away” point. If the PHP script had broken, or the importer error rate had been higher, I probably would have given up. Then I would be writing a post griping about how companies like Netflix that make it intentionally difficult to get your data out. But I’ll leave that for someone else to cover.
