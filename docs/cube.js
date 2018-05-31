var Vertex = function(x, y, z) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.z = parseFloat(z);
};

var Vertex2D = function(x, y) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
};

var Cube = function(center, size) {
    var d = size / 2;
    this.vertices = [
        new Vertex(center.x - d, center.y - d, center.z + d),
        new Vertex(center.x - d, center.y - d, center.z - d),
        new Vertex(center.x + d, center.y - d, center.z - d),
        new Vertex(center.x + d, center.y - d, center.z + d),
        new Vertex(center.x + d, center.y + d, center.z + d),
        new Vertex(center.x + d, center.y + d, center.z - d),
        new Vertex(center.x - d, center.y + d, center.z - d),
        new Vertex(center.x - d, center.y + d, center.z + d)
    ];
    this.faces = [
        [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
        [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
        [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
        [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
        [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
        [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
    ];
};

function project(M) {
    // var d = 200;
    // var r = d / M.y;
    var r = 100 / M.y;
    return new Vertex2D(r * M.x, r * M.z);
}

function render(objects, ctx, dx, dy) {
    ctx.clearRect(0, 0, 2*dx, 2*dy);
    for (var i = 0, n_obj = objects.length; i < n_obj; ++i) {
        for (var j = 0, n_faces = objects[i].faces.length; j < n_faces; ++j) {
            var face = objects[i].faces[j];
            var P = project(face[0]);
            ctx.beginPath();
            ctx.moveTo(P.x + dx, -P.y + dy);
            for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) {
                P = project(face[k]);
                ctx.lineTo(P.x + dx, -P.y + dy);
            }
            ctx.closePath();
            ctx.stroke();
        }
    }
}

(function() {
    var canvas = document.getElementById('cnv');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    var dx = canvas.width / 2;
    var dy = canvas.height / 2;
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    var cube_center = new Vertex(0, 11*dy/10, 0);
    var cube = new Cube(cube_center, 300);
    var objects = [cube];

    render(objects, ctx, dx, dy);

    var mousedown = false;
    var mx = 0;
    var my = 0;
    canvas.addEventListener('mousedown', initMove);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stopMove);

    function rotate(M, center, theta) {
        var ct = Math.cos(theta);
        var st = Math.sin(theta);
        var x = M.x - center.x;
        var y = M.y - center.y;
        var z = M.z - center.z;
        M.x = ct * x - st * y + center.x;
        M.y = st * x + ct  * y + center.y;
        M.z = z + center.z;
    }

    function initMove(evt) {
        mousedown = true;
        mx = evt.clientX;
        my = evt.clientY;
    }

    function move(evt) {
        if (mousedown) {
            var theta = (evt.clientX - mx) * Math.PI / 360;
            for (var i = 0; i < 8; ++i) {
                rotate(cube.vertices[i], cube_center, theta);
            }
            mx = evt.clientX;
            my = evt.clientY;
            render(objects, ctx, dx, dy);
        }
    }

    function stopMove() {
        mousedown = false;
    }
})();