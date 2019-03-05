#! /usr/bin/env bash

mvn clean install
sed -i 's/default.http.port=9080/default.http.port=3000/g' target/liberty/wlp/usr/servers/defaultServer/bootstrap.properties
target/liberty/wlp/bin/server package defaultServer --archive="myapp" --include=minify
