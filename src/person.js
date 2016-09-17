"use strict";

var root = process.cwd();

var color = require('./color');
var names = require(`${root}/data/names.json`);
var documentClass = require(`${root}/data/documentClass.json`);

function randomInt(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

var cache = {};

function documentClassJson(){
    return Object.getOwnPropertyNames(documentClass)
        .map(function(className){
            return {
                className: className,
                file: documentClass[className].file,
                color: color.hexToRGB(documentClass[className].hex)
            };
        });
}

module.exports = {

    with: function(cacheRef){
        cache = cacheRef;
        return this;
    },

    create: function(firstNameSeed, lastNameSeed){
        return {
            first: names[firstNameSeed || randomInt(0, names.length)],
            last: names[lastNameSeed || randomInt(0, names.length)],
            handwriting: Math.random() * randomInt(0,1) || -1,
            docs: cache.docs || documentClassJson()
        }
    }
};