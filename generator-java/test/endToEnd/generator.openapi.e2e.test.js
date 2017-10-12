/*
 * Copyright IBM Corporation 2017
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* Test to see if when you choose every technology type it builds */

'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const frameworkTest = require('../lib/test-framework');

const ARTIFACTID = 'artifact.0.1';
const GROUPID = 'test.group';
const VERSION = '1.0.0';
const APPNAME = 'testApp';
const FRAMEWORK_LIBERTY = 'liberty';
const FRAMEWORK_SPRING = 'spring';

const tests = require('@arf/java-common');
const command = tests.test('command');

function Options(buildType, framework) {
  var platform = framework === FRAMEWORK_SPRING ? 'SPRING' : 'JAVA';
  var example = frameworkTest.test(framework).getExampleOpenApi()
  this.options = {
    headless :  "true",
    debug : "true",
    buildType : buildType,
    createType : 'blank/' + framework,
    appName : APPNAME,
    groupId : GROUPID,
    artifactId : ARTIFACTID,
    version : VERSION,
    bluemix : {
      backendPlatform : platform,
      openApiServers : [{
          "spec" : JSON.stringify(example.value)
      }]
    }
  }
  this.assertBuilds = function() {
    command.run(tests.test(buildType).getBuildCommand());
  }
  this.before = function() {
    return helpers.run(path.join( __dirname, '../../generators/app'))
      .withOptions(this.options)
      .withPrompts({})
      .toPromise();
  }
}

describe('java generator : blank/liberty end to end test', function() {
  this.timeout(10000);
  var buildTypes = ['gradle', 'maven'];
  for(var i=0; i < buildTypes.length; i++) {
    describe('Generates a blank project build type ' + buildTypes[i], function () {
      var options = new Options(buildTypes[i], FRAMEWORK_LIBERTY);
      before(options.before.bind(options));
      options.assertBuilds();
    });
  }
});

describe('java generator : blank/spring end to end test', function() {
  this.timeout(10000);
  var buildTypes = ['gradle', 'maven'];
  for(var i=0; i < buildTypes.length; i++) {
    describe('Generates a blank project build type ' + buildTypes[i], function () {
      var options = new Options(buildTypes[i], FRAMEWORK_SPRING);
      before(options.before.bind(options));
      options.assertBuilds();
    });
  }
});