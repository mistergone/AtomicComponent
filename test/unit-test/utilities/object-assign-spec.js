'use strict';

var BASE_JS_PATH = '../../../src';
var chai = require( 'chai' );
var expect = chai.expect;
var assign = require( BASE_JS_PATH + '/utilities/object-assign' ).assign;
var jsdom = require( 'mocha-jsdom' );
var testObjectA;
var testObjectB;
var testObjectC;
var UNDEFINED;


beforeEach( function() {

  testObjectA = {
    str:  'test',
    func: function() { return 'testStr'; },
    num:  1
  };

  testObjectB = {
    obj:   { test: 2 },
    arr:   [ 3 ],
    _null: null
  };

  testObjectC = {
    bool:  Boolean( false ),
    undef: UNDEFINED,
    num:   4
  };

} );

describe( 'object-assign', function() {
  it( 'should assign properties from source to destination', function() {
    assign( testObjectA, testObjectB );

    expect( testObjectA.hasOwnProperty( 'obj' ) ).to.be.true;
    expect( testObjectA.hasOwnProperty( 'arr' ) ).to.be.true;
    expect( testObjectA.hasOwnProperty( '_null' ) ).to.be.true;
  } );

  it( 'should assign values from source to destination', function() {
    assign( testObjectA, testObjectB );

    expect( testObjectA.obj.test === 2 ).to.be.true;
    expect( testObjectA.arr[0] === 3 ).to.be.true;
    expect( testObjectA._null === null ).to.be.true;
  } );

  it( 'should assign multiple source properties to destination', function() {
    assign( testObjectA, testObjectB, testObjectC );

    expect( testObjectA.hasOwnProperty( 'bool' ) ).to.be.true;
    expect( testObjectA.hasOwnProperty( 'undef' ) ).to.be.true;
    expect( testObjectA.hasOwnProperty( 'num' ) ).to.be.true;
  } );

  it( 'should assign multiple source values to destination', function() {
    assign( testObjectA, testObjectB, testObjectC );

    expect( testObjectA.bool === false ).to.be.true;
    expect( typeof testObjectA.undef === 'undefined' ).to.be.true;
    expect( testObjectA.num === 4 ).to.be.true;
  } );

  it( 'should selectively overwrite existing source properties', function() {
    expect( testObjectA.num === 1 ).to.be.true;

    assign( testObjectA, testObjectC );

    expect( testObjectA.str === 'test' ).to.be.true;
    expect( testObjectA.func() === 'testStr' ).to.be.true;
    expect( testObjectA.num === 4 ).to.be.true;
  } );
} );
