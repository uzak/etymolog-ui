#
# Makefile
# Martin Užák, 2020-05-02 14:31
#

.PHONY: serve update-version build

DEPLOY_DIR	?=	../uzak.github.io/etymolog
YARN ?= yarnpkg
 
serve: update-version
	$(YARN) serve --port 8000

update-version:
	$(YARN) version --new-version 0.1.`git rev-list --count HEAD` --no-git-tag-version

build: export NODE_OPTIONS="--openssl-legacy-provider"
build:
	$(YARN) run build
	rm -rvf ${DEPLOY_DIR}
	cp -rv dist ${DEPLOY_DIR}



# vim:ft=make
#
