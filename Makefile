#
# Makefile
# Martin Užák, 2020-05-02 14:31
#

.PHONY: serve update-version

serve: update-version
	yarn serve --port 8000

update-version:
	yarn version --new-version 0.1.`git rev-list --count HEAD` --no-git-tag-version


# vim:ft=make
#
