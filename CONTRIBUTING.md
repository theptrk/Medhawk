# Contributing

## Fork the repo
Use github’s interface to make a fork of the repo, then add this repo
as an upstream remote:

```
git remote add upstream https://github.com/MedHawk/Medhawk.git
```

## Create your branch based off of the development branch

Your branch should follow this naming convention:
* `feat/thefeature` for feature additions
* `bug/thebug` for bugfixes
* `test/thetest` for test files
* `doc/description` for documentation changes/style fixes

These commands will help you do this:

``` bash
# Brings you to the development branch
git checkout development

# Creates your branch and brings you there
git checkout -b `your-branch-name`
```

## Make commits to your branch - keep your commits focused!

Make changes and commits on your branch, and make sure that you
only make changes that are relevant to this branch. If you find
yourself making unrelated changes, make a new branch for those
changes.

Your commits should be full sentences and start with a past-tense
verb. Use good sense here, if your commit messages are bad we
may ask you to change them.

## Rebase upstream changes into your branch

Once you are done making changes, you can begin the process of getting
your code merged into the main repo. Step 1 is to rebase upstream
changes to the development branch into yours by running this command
from your branch:

```
git pull --rebase upstream development
```

This will start the rebase process. You must commit all of your changes
before doing this. If there are no conflicts, this should just roll all
of your changes back on top of the changes from upstream, leading to a
nice, clean, linear commit history.

If there are conflicting changes, git will start yelling at you part way
through the rebasing process. Git will pause rebasing to allow you to sort
out the conflicts. You do this the same way you solve merge conflicts,
by checking all of the files git says have been changed in both histories
and picking the versions you want. Be aware that these changes will show
up in your pull request, so try and incorporate upstream changes as much
as possible.

Once you are done fixing conflicts for a specific commit, run:

```
git rebase --continue
```

This will continue the rebasing process. Once you are done fixing all
conflicts you should run the existing tests to make sure you didn’t break
anything, then run your new tests (there are new tests, right?) and
make sure they work also.

If rebasing broke anything, fix it, then repeat the above process until
you get here again and nothing is broken and all the tests pass.

## Make a pull request

Make a clear pull request from your branch to the upstream development
branch, detailing exactly what changes you made and what feature this
should add. The clearer your pull request is the faster you can get
your changes incorporated into this repo.

At least one other person MUST give your changes a code review, and once
they are satisfied they will merge your changes into upstream. Alternatively,
they may have some requested changes. You should make more commits to your
branch to fix these, then follow this process again from rebasing onwards.

Once you get back here, make a comment requesting further review and
someone will look at your code again. If they like it, it will get merged,
else, just repeat again.

Thanks for contributing!

## Checklist:

This is just to help you organize your process

- [ ] Did I base my work branch off of development?
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
 - [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream development branch after I finished all my
  work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
 - [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.

