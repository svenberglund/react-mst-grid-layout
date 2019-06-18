# Deploying demo

For some reason after a deploy there is a commit done from github on the branch that totally screws it up.
Therefore don't do a pull from the origin to this branch.\
When you want to commit your changes (typically merges) on this branch, instead do something like this.

```
git commit

# now you have commited your merge and want to deploy...

git push origin :gh-pages
git push

# then you should be good to deploy

npm run deploy
```

Note that now (after invoking deploy) the upstream will have a weird commit on top again. You shold not pull it, nore revert it (if you do the deployment breaks). 
Just leave it as is until next time to deploy....