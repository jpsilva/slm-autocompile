var path = require('path');
var fs = require('fs');

describe('slm-autocompile module', function() {
  var compiler;
  beforeEach(function() {
    compiler = require('../lib/slm-autocompile.js');
  });

  it('compile a simple SLM with out locals or properties', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/test1.slm', 'slm/test1.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<html></html>');
        flag = true;
      });
    });

    waitsFor(function() {
      return flag;
    });

  });

  it('compile a simple SLM with out locals', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/test2.slm', 'slm/test2.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<html><div><img /></div></html>');
        flag = true;
      });

    });

    waitsFor(function() {
      return flag;
    });

  });

  it('compile a simple SLM with locals in one line', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/test3.slm', 'slm/test3.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<html><div><label>Holaaaa</label></div></html>');
        flag = true;
      });

    });

    waitsFor(function() {
      return flag;
    });

  });

  it('compile a simple SLM with locals in more than one line', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/test4.slm', 'slm/test4.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<html><div><label>Holaaaa</label></div><label>33.5</label></html>');
        flag = true;
      });

    });

    waitsFor(function() {
      return flag;
    });

  });

  it('compile a more complex SLM with locals and functions', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/test5.slm', 'slm/test5.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<html><div><label>Holaaaa</label></div><label>33.5</label><div><span>9</span></div></html>');
        flag = true;
      });

    });

    waitsFor(function() {
      return flag;
    });

  });

  it('compile a more complex SLM with locals, functions, arrays, objects and HTML comments', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/test6.slm', 'slm/test6.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<html><div><label>Holaaaa</label></div><label>33.5</label><div><span>9</span><!--this comment must not \'joder\'--></div><section><span>44,Chauuu</span><span>99</span></section></html>');
        flag = true;
      });

    });

    waitsFor(function() {
      return flag;
    });

  });

  it('compile a simple SLM but with some JS inside', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/test7.slm', 'slm/test7.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.18/require.js" type="text/javascript"></script><script src="js/multi-loader.js" type="text/javascript"></script><script type="text/javascript">//call the loader with the JSON path and the root to create the URLs // return a promise\nloadModules(\'main\', \'/\').then(function(modules){\n  //log all the modules to load\n  console.log(modules);\n}).catch(function(err){\n  //catch the errors\n  console.warn(err);\n});</script></head><body></body></html>');
        flag = true;
      });

    });

    waitsFor(function() {
      return flag;
    });

  });


  it('compile a simple SLM but with one inserted slm', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/test8.slm', 'slm/test8.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<html><head></head><body><div><a>This is a partial!<span>true</span></a></div><span>Manuel</span></body></html>');
        flag = true;
      });
    });
    waitsFor(function() {
      return flag;
    });
  });

  it('compile a simple SLM but with one inserted slm using name variables', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/test9.slm', 'slm/test9.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<html><head></head><body><div><a>This is a partial!<span>true</span></a></div><span>Manuel</span></body></html>');
        flag = true;
      });
    });
    waitsFor(function() {
      return flag;
    });
  });

  it('compile a simple SLM to test Attributes', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/features/attributes.slm', 'slm/features/attributes.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<!DOCTYPE html><html><head></head><body><a class="button" href="google.com">Google</a><span class="authed"></span><input checked="checked" type="checkbox" /><a style="color:red;background:green"></a><input checked="checked" name="agreement" type="checkbox" /><a class="foo bar baz" id="classes"></a></body></html>');
        flag = true;
      });
    });
    waitsFor(function() {
      return flag;
    });
  });

  it('compile a simple SLM to test Code', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/features/code.slm', 'slm/features/code.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<!DOCTYPE html><html><head></head><body><p>you have 10 friends</p><ul><li>Uno</li><li>Dos</li><li>Tres</li><li>Cuatro</li><li>Cinco</li><li>Seis</li></ul><span>true10</span><h2>Authenticated</h2></body></html>');
        flag = true;
      });
    });
    waitsFor(function() {
      return flag;
    });
  });


  it('compile a simple SLM to test Comments', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/features/comments.slm', 'slm/features/comments.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<!DOCTYPE html><html><head></head><body><!-- HTML comments--><!--HTML block comment--></body></html>');
        flag = true;
      });
    });
    waitsFor(function() {
      return flag;
    });
  });

  it('compile a simple SLM to test Extends', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/features/extends.slm', 'slm/features/extends.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<!DOCTYPE html><html><head><title>Nice</title><style type="text/css">body {background :red};</style></head><body><div>The body</div><p>This is new footer</p></body><script>console.log(\'script\');</script><script type="text/javascript">console.log(\'javascript\');</script></html>');
        flag = true;
      });
    });
    waitsFor(function() {
      return flag;
    });
  });

  it('compile a simple SLM to test Interpolation', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/features/interpolation.slm', 'slm/features/interpolation.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<!DOCTYPE html><html><head></head><body><p>This user is authenticated</p></body></html>');
        flag = true;
      });
    });
    waitsFor(function() {
      return flag;
    });
  });

  it('compile a simple SLM to test Mixin', function(done) {
    var flag;
    runs(function() {
      compileSlm.call(this, compiler, 'slm/features/mixin.slm', 'slm/features/mixin.html', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual('<!DOCTYPE html><html><head></head><body><ul><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li></ul></body></html>');
        flag = true;
      });
    });
    waitsFor(function() {
      return flag;
    });
  });

});

function compileSlm(compiler, file, output, cb) {
  compiler.filePath = path.join(__dirname, file);
  compiler.fileExt = '.slm';
  compiler.compile(path.join(__dirname, file), function(err, _slm, options) {
    if (err)
      cb(err);
    compiler.saveSlm(path.join(__dirname, file), _slm, options.output, function(){
      fs.readFile(path.join(__dirname, output), {
        encoding: 'utf-8'
      }, function readFile(err, data) {
        cb(err, data);
      });
    });
  });
}
