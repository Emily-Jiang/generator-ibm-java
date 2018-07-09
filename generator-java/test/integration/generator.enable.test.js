/*
 * © Copyright IBM Corp. 2017, 2018
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

/**
 * Tests the enable generator
 */

'use strict';

const testAsserts = require('../../index').testAsserts;
const AssertEnable = testAsserts.starters.enable;
const constant = testAsserts.constant;
const core = require('../lib/core');
const extend = require('extend');

class Options extends core.Options {
  constructor(framework, buildType) {
    let backendPlatform = framework === 'spring' ? 'SPRING' : 'JAVA';
    super(backendPlatform)
    extend(this.values, {
      buildType: buildType,
      frameworkType: framework,
      createType: 'enable/' + framework,
      services: [],
      appName : constant.APPNAME
    })
  }
}

const frameworkTypes = [constant.FRAMEWORK_LIBERTY, constant.FRAMEWORK_SPRING];
const gradle = 'gradle';
const maven = 'maven';
const assert = new AssertEnable();

frameworkTypes.forEach(frameworkType => {
  describe('java generator : enable integration test : ' + frameworkType, function () {
    this.timeout(7000);
    describe('Enable a project using a gradle build : ' + frameworkType, function () {
      const options = new Options(frameworkType, gradle);
      before(options.before.bind(options));
      assert.assert(constant.APPNAME, constant.APPNAME, gradle, frameworkType, options.values.createType);
    });

    describe('Enable a project using a maven build : ' + frameworkType, function () {
      const options = new Options(frameworkType, maven);
      before(options.before.bind(options));
      assert.assert(constant.APPNAME, constant.APPNAME, maven, frameworkType, options.values.createType);
    });
  });
});
