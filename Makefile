PUBLISH_BUCKET=soydigital-packages

package::
	@echo "Creating zip package"
	zip -r bmsc-frontend.zip . -x '.nuxt*' -x .env -x 'deploy*' -x 'node_module*' -x '.git*' -x 'infrastructure*' -x 'public*' -x 'Makefile'

publish:: package
	@echo "Publish zip package"
	aws s3 cp bmsc-frontend.zip s3://${PUBLISH_BUCKET}/bmsc/
	rm -rf bmsc-frontend.zip

package-and-publish: package publish
 