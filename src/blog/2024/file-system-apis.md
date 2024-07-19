---
title: The Many, Confusing File System APIs
date: 2024-04-02
tags:
  - development
  - javascript
  - standards
  - apis
  - filesystem
excerpt: There are many APIs that interact with the file system, and figuring out what they all do can be deeply frustrating. Don’t give up! I’m here to help.
canonical: https://cloudfour.com/thinks/the-many-confusing-file-system-apis/
feature_image: feature/file-system-apis.jpg
feature_alt: A goat, surrounded by variations of the words "file system API" looks extremely confused.
---

There are many APIs that interact with the file system, and figuring out what they all do can be deeply frustrating. Don’t give up! I’m here to help.

On a recent project, we were developing a feature that could save directories of files to the user’s file system. A coworker suggested I check out the “File System API,” but warned that it only works in Chrome. I’d never heard of it, so I searched [CanIUse.com](http://caniuse.com/) for “[file api](https://caniuse.com/?search=file%20api).” I got a confusing list of similarly-named results, some of which appeared to be duplicates.

There’s the File API, the File API (again), the File System Access API (which is marked as unofficial), the Filesystem & FileWriter API (also marked as unofficial), the FileReader API, the FileList API, the FileSystem API, the File API: name, the FileReader API (again), and the FileEntrySync API (marked as deprecated).

Well, that wasn’t much help. So I googled “File System API” and found myself on a Chrome Developers Blog post called [The File System Access API: simplifying access to local files](https://developer.chrome.com/docs/capabilities/web-apis/file-system-access). “Sounds promising,” I thought! The first thing I saw was this highlighted section:

> **Note:** The File System Access API—despite the similar name—is distinct from the ￼`FileSystem`￼ interface exposed by the **File and Directory Entries API**, which documents the types and operations made available by browsers to script when a hierarchy of files and directories are dragged and dropped onto a page or selected using form elements or equivalent user actions. It is likewise distinct from the deprecated **File API: Directories and System** specification, which defines an API to navigate file system hierarchies and a means by which browsers may expose sandboxed sections of a user's local filesystem to web applications.

Feeling intimidated, I headed to Stack Overflow, where after a bit of searching I landed on a [helpful answer](https://stackoverflow.com/questions/44094507/how-to-store-large-files-to-web-local-storage/71581910#71581910) that suggested I look into the Origin Private File System, but cautioned me about similarly named APIs:

> Don't confuse OPFS with the other filesystem and filesystem-esque APIs. MDN has a detailed rundown on [their "File System Access API" page](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) (though I feel the page is misnamed, as it covers multiple distinct separate API surfaces, and the way it's written implies some features (like `Window.showOpenFilePicker()`) have wide-support when the reality is quite the opposite… There’s Google's older and now deprecated \(but still supported\) `chrome.fileSystem` API, originally intended for Chrome Apps and browser-extensions… There’s also the File and Directory Entries API, which has wide browser support for read-only access to the user's local computer filesystem. Note that this API is distinct from, but extends, the original W3C File API which also defines the `File` interface.

Friends, I’m not going to lie to you. At this point, I spent a long time looking out the window and considered moving to the country to raise goats. 🐐 🐐 🐐

## The APIs

Okay. Deep breath. We’re going to get to the bottom of this. The good news is that while this is confusing due to there being multiple standards with some combination of the words “file,” “system,” and “API,” there are fewer than it seems at first, and they actually build on each other, adding layers of functionality. So let’s go on a bit of a tour.

### File API

Up first, we have the **[File API](https://w3c.github.io/FileAPI/)**, a W3C[^1] draft standard[^2] for “representing file objects in web applications, as well as programmatically selecting them and accessing their data.”

TL;DR: it defines what a “file” is, and allows you to read it.

> Using the File API, web content can ask the user to select local files and then read the contents of those files. This selection can be done by either using an HTML `<input type="file">` element or by drag and drop. —[MDN](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications)

What the File API does _not_ provide is any way to interact with directories or write files to the file system. Those features will be added by successive standards.

- First published in October 2006
- Provides: `Blob`, `File`, `FileList`, `FileReader`, and the ability to create a URL from a `File`
- Learn more: [MDN: File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API)

#### FileReader API

CanIUse lists the **[FileReader API](https://www.w3.org/TR/FileAPI/#dfn-filereader)** separately, but it’s actually part of the File API. It’s the part of the standard that allows you to actually read the contents of a file. Without this, you have access to the file’s name, size, and type, but not the content, because it’s just a blob of binary data.

#### File Writer API

Similar to the FileReader API, the **[File Writer API](https://www.w3.org/TR/file-writer-api/)** was a W3C draft standard that would have extended the File API to allow writing to files from a web application. It was discontinued in 2014. I’m unable to find any reference to why, beyond some forum speculation it might have caused security problems. But don’t worry, the ability to write files was later added to the File System API (see below).

#### File Directories and System API

The **[File Directories and System API](https://www.w3.org/TR/file-system-api/)** (listed for some reason as _Filesystem and FileWriter API_ in CanIUse) was another W3C draft standard that would have added functionality to the File API. In this case, it would have defined how to “navigate file system hierarchies, and a means to expose sandboxed sections of a user's local filesystem to web applications.” It was also discontinued in 2014, and I’m also unable to find any references to why, though the bulk of what it proposed was later recycled into the File and Directory Entries API community proposal (see below).

### File and Directory Entries API

The **[File and Directory Entries API](https://wicg.github.io/entries-api/)**, is a WICG[^3] proposal[^4] that “documents the types and operations made available by web browsers to script when a hierarchy of files and directories are dragged and dropped onto a page or selected using form elements, or equivalent user actions.” It is heavily based on the now-discontinued File Directories & System API.

TL;DR: it extends the File API to understand how to read directories as well as files.

Confusingly, the MDN pages for this API talk about a sandboxed file system, even though this proposal does not cover that (see Origin Private File System below). I believe that’s because the sandboxed file system _was_ included in the now-deprecated File Directories and System API that this was based on. Perhaps the MDN pages were originally written for that standard.

- First published in May 2016
- Provides: `FileSystem`, `FileSystemEntry`, `FileSystemFileEntry`, `FileSystemDirectoryEntry`, and `FileSystemDirectoryReader`
- Learn more: [MDN: File and Directory Entries API](https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API)

### File System API

The **[File System API](https://fs.spec.whatwg.org/)** is a WHATWG[^5] living standard[^6] that “defines fundamental infrastructure for file system APIs. In addition, it defines an API that makes it possible for websites to get access to a file system directory without having to first prompt the user for access.” Also, it “provides access to a special kind of file that is highly optimized for performance” in web workers.

TL;DR: it creates a “bucket file system” (also known as the Origin Private File System, see below), allows you to access files in a file system, and allows high-performance file access for web workers.

Although this standard is very new, having only been created in 2022, it actually represents a migration of parts of the older File System Access API community proposal (see below). The parts that became this document are now an approved standard, while the parts the remained behind in the community proposal are still being worked on.

- First published in February 2022
- Provides: `FileSystemHandle`, `FileSystemFileHandle`, `FileSystemDirectoryHandle`, `FileSystemWritableFileStream`, `FileSystemSyncAccessHandle`, and `StorageManager.getDirectory()`
- Learn more: [MDN: File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)

#### Origin Private File System

The **[Origin Private File System](https://fs.spec.whatwg.org/#sandboxed-filesystem)** (OPFS) is defined in the File System API. It is a sandboxed storage endpoint private to the origin of the page (meaning each web application has sandboxed storage) and not visible to the user. The standard says, “This enables use cases where a website wants to save data to disk before a user has picked a location to save to, without forcing the website to use a completely different storage mechanism with a different API for such files.”

TL;DR: it provides a sandboxed private file system for your web application without touching the user’s file system.

In our case, as we downloaded files from a directory on the server, we would store them in the OPFS until everything was ready, and then we would prompt the user to give us permission to copy those files from the OPFS to their file system.

- Learn more: [MDN: Origin Private File System](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system)
- Learn more: [Web.dev: The origin private file system](https://web.dev/articles/origin-private-file-system)
- Learn more: [WebKit: The File System API with Origin Private File System](https://webkit.org/blog/12257/the-file-system-access-api-with-origin-private-file-system/)

### File System Access API

The **[File System Access API](https://wicg.github.io/file-system-access/)** is a WICG proposal that “extends the File System API to interact with files on the user’s local device. It builds on the File API for file reading capabilities, and adds new methods to enable modifying files, as well as working with directories.”

TL;DR: it extends the existing APIs to finally allow for saving to the user’s file system and improves the ability to work with directories.

Originally, this proposal also contained the definitions for file system handles as well as the OPFS endpoint, but those portions were moved to the File System API in 2022, leaving behind the `Picker` methods as a proposal.

- First published in March 2016
- Portions were migrated to the File System API in February 2022
- Provides: `showOpenFilePicker()`, `showSaveFilePicker()`, and `showDirectoryPicker()`
- Learn more: [Chrome: The File System Access API: simplifying access to local files](https://developer.chrome.com/docs/capabilities/web-apis/file-system-access)

## Can I actually use any of these APIs?

That’s an excellent question, and not a simple one to answer. Normally, [CanIUse.com](https://caniuse.com/) is our friend, but because all of these standards are at various points in the approval process, they enjoy varying degrees of browser support (including between features in the same standard!). CanIUse solved this problem by listing individual features of each standard separately. As a result, I recommend searching for the actual feature you want, such as [`showDirectoryPicker()`](https://caniuse.com/mdn-api_window_showdirectorypicker), rather than the standard as a whole.

In the case of our client app, I found the older standards were quite well supported, but the newer features provided by the File System Access API were mostly only supported in Chromium browsers. This will only improve over time, but for now, you should be sure to test your work carefully across all browsers you need to support.

## Why is this so complicated?

Interacting with file systems is inherently complex. The browser needs to support actions ranging from “download a single file,” to “drop a folder containing a nested hierarchy of files and folders,” and applications ranging from “a paint program that can open an image, make edits, and save the changes,” to “a complete database in the browser.”

There are also security concerns. Should the browser be able to write to any folder on the computer? (Probably not.) Should the browser allow the user to unintentionally expose sensitive system files to possibly nefarious web applications? (Arguably not. [Chrome won’t let the user select certain folders](https://stackoverflow.com/questions/62153191/how-does-chromium-define-a-system-file) for this reason.) Does exposing the available disk space to the web application qualify as a security risk? (Yes, [the standard says this can lead to fingerprinting](https://storage.spec.whatwg.org/#usage-and-quota).)

In my case—trying to save a directory of files from a server—some of the restrictions seemed like overkill. After digging into the standards a bit more, I have a greater appreciation for the complexity browser makers face.

## Conclusion

To recap, the **File API** added the ability to read a file. The **File and Directory Entries API** adds the ability to read directories. The **File System API** adds the **Origin Private File System**, and the concept of “handles” that represent file system entries. Finally, the **File System Access API** adds new “picker” methods to prompt the user for access to their file system.

When I started down this path, I spent a long time trying to make sense of all these APIs with confusingly similar names. Some were deprecated, some said they only affected drag-and-drop operations, and they were all maintained by different groups. My typical destinations to learn more, CanIUse and MDN, were less helpful than usual and contained misleading or confusing information.

But my confusion is your gain. Hopefully, this post will save some other developers from abandoning the web for goat farming!

[^1]: **What is the W3C?** [The World Wide Web Consortium](https://www.w3.org/) develops standards and guidelines for the web. It was founded in 1994 by the inventor of the web, Sir Tim Berners-Lee.

[^2]: **What is a draft standard?** W3C specifications go through [several stages](https://www.w3.org/standards/types/), including: _draft standards_, which are still evolving; _candidate standards_, which are more mature and close to approval; and _standards_ (also known as _recommendations_), which have been formally reviewed and endorsed by the W3C.

[^3]: **What is the WICG?** [The Web Incubator Community Group](https://wicg.io/) is a W3C community group that incubates new web platform features. It is not a standards body, but sometimes the proposals they create become standards.

[^4]: **What is a proposal?** A [WICG proposal](https://github.com/WICG/proposals) is an idea for a new standard that is being discussed by the community. Once consensus is reached, the WICG may advocate for the W3C or WHATWG to adopt the proposal to become a standard.

[^5]: **What is the WHATWG?** [The Web Hypertext Application Technology Working Group](https://whatwg.org/) is a web standards body founded by community members and browser makers in 2004 when they became concerned that the W3C was mismanaging the HTML standard. [In 2019, the W3C and WHATWG came to an agreement](https://www.w3.org/news/2019/w3c-and-the-whatwg-have-just-signed-an-agreement-to-collaborate-on-the-development-of-a-single-version-of-the-html-and-dom-specifications/) that the WHATWG would take over maintaining the HTML standard.

[^6]: **What is a living standard?** As opposed to the W3C’s standards which are rigorously versioned and finalized, the WHATWG maintains [“living standards”](https://whatwg.org/faq#living-standard) that are continuously updated. Snapshots of the living standards are taken at regular intervals for implementers to reference.
