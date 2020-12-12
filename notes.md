# NOTES

## The Anatomy Of A Request
It’s important to know that a request is made up of four things:

* The endpoint
* The method
* The headers
* The data (or body)

The endpoint (or route) is the url you request for. It follows this structure: `root-endpoint/?`

The root-endpoint is the starting point of the API you’re requesting from. The root-endpoint of Github’s API is https://api.github.com while the root-endpoint Twitter’s API is https://api.twitter.com.

The path determines the resource you’re requesting for. Think of it like an automatic answering machine that asks you to press 1 for a service, press 2 for another service, 3 for yet another service and so on.

To understand what paths are available to you, you need to look through the API documentation. For example, let’s say you want to get a list of repositories by a certain user through Github’s API. The docs tells you to use the the following path to do so:

`/users/:username/repos`

Any colons (:) on a path **denotes a variable**. You should replace these values with actual values of when you send your request. In this case, you should replace :username with the actual username of the user you’re searching for. If I’m searching for my Github account, I’ll replace :username with zellwk.

The endpoint to get a list of my repos on Github is this:
`https://api.github.com/users/zellwk/repos`

