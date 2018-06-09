var Color4 = (function () {
    function Color4(initialR, initialG, initialB, initialA) {
        this.r = initialR;
        this.g = initialG;
        this.b = initialB;
        this.a = initialA;
    }
    return Color4;
})();
var Matrix = (function () {
    function Matrix() {
        this.m = [];
    }
    Matrix.prototype.multiply = function (other) {
        var result = new Matrix();
        result.m[0] = this.m[0] * other.m[0] + this.m[1] * other.m[4] + this.m[2] * other.m[8] + this.m[3] * other.m[12];
        result.m[1] = this.m[0] * other.m[1] + this.m[1] * other.m[5] + this.m[2] * other.m[9] + this.m[3] * other.m[13];
        result.m[2] = this.m[0] * other.m[2] + this.m[1] * other.m[6] + this.m[2] * other.m[10] + this.m[3] * other.m[14];
        result.m[3] = this.m[0] * other.m[3] + this.m[1] * other.m[7] + this.m[2] * other.m[11] + this.m[3] * other.m[15];
        result.m[4] = this.m[4] * other.m[0] + this.m[5] * other.m[4] + this.m[6] * other.m[8] + this.m[7] * other.m[12];
        result.m[5] = this.m[4] * other.m[1] + this.m[5] * other.m[5] + this.m[6] * other.m[9] + this.m[7] * other.m[13];
        result.m[6] = this.m[4] * other.m[2] + this.m[5] * other.m[6] + this.m[6] * other.m[10] + this.m[7] * other.m[14];
        result.m[7] = this.m[4] * other.m[3] + this.m[5] * other.m[7] + this.m[6] * other.m[11] + this.m[7] * other.m[15];
        result.m[8] = this.m[8] * other.m[0] + this.m[9] * other.m[4] + this.m[10] * other.m[8] + this.m[11] * other.m[12];
        result.m[9] = this.m[8] * other.m[1] + this.m[9] * other.m[5] + this.m[10] * other.m[9] + this.m[11] * other.m[13];
        result.m[10] = this.m[8] * other.m[2] + this.m[9] * other.m[6] + this.m[10] * other.m[10] + this.m[11] * other.m[14];
        result.m[11] = this.m[8] * other.m[3] + this.m[9] * other.m[7] + this.m[10] * other.m[11] + this.m[11] * other.m[15];
        result.m[12] = this.m[12] * other.m[0] + this.m[13] * other.m[4] + this.m[14] * other.m[8] + this.m[15] * other.m[12];
        result.m[13] = this.m[12] * other.m[1] + this.m[13] * other.m[5] + this.m[14] * other.m[9] + this.m[15] * other.m[13];
        result.m[14] = this.m[12] * other.m[2] + this.m[13] * other.m[6] + this.m[14] * other.m[10] + this.m[15] * other.m[14];
        result.m[15] = this.m[12] * other.m[3] + this.m[13] * other.m[7] + this.m[14] * other.m[11] + this.m[15] * other.m[15];
        return result;
    };
    Matrix.FromValues = function FromValues(initialM11, initialM12, initialM13, initialM14, initialM21, initialM22, initialM23, initialM24, initialM31, initialM32, initialM33, initialM34, initialM41, initialM42, initialM43, initialM44) {
        var result = new Matrix();
        result.m[0] = initialM11; result.m[1] = initialM12; result.m[2] = initialM13; result.m[3] = initialM14; 
        result.m[4] = initialM21; result.m[5] = initialM22; result.m[6] = initialM23; result.m[7] = initialM24; 
        result.m[8] = initialM31; result.m[9] = initialM32; result.m[10] = initialM33; result.m[11] = initialM34;
        result.m[12] = initialM41; result.m[13] = initialM42; result.m[14] = initialM43; result.m[15] = initialM44;
        return result;
    };
    Matrix.Identity = function Identity() {
        return Matrix.FromValues(
            1.0, 0, 0, 0, 
            0, 1.0, 0, 0,
            0, 0, 1.0, 0,
            0, 0, 0, 1.0
        );
    };
    Matrix.Zero = function Zero() {
        return Matrix.FromValues(
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        );
    };
    Matrix.RotationX = function RotationX(angle) {
        var result = Matrix.Zero();
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        // 1  0  0  0
        // 0  c -s  0
        // 0  s  c  0
        // 0  0  0  1
        result.m[0] = 1.0;
        result.m[5] = c; result.m[6] = -s;
        result.m[9] = s; result.m[10] = c;
        result.m[15] = 1.0;
        return result;
    };
    Matrix.RotationY = function RotationY(angle) {
        var result = Matrix.Zero();
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        // c  0  s  0
        // 0  1  0  0
        //-s  0  c  0
        // 0  0  0  1
        result.m[5] = 1.0;
        result.m[0] = c; result.m[2] = s;
        result.m[8] = -s; result.m[10] = c;
        result.m[15] = 1.0;
        return result;
    };
    Matrix.RotationZ = function RotationZ(angle) {
        var result = Matrix.Zero();
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        // c -s  0  0
        // s  c  0  0
        // 0  0  1  0
        // 0  0  0  1
        result.m[0] = c; result.m[1] = -s;
        result.m[4] = s; result.m[5] = c;
        result.m[10] = 1.0;
        result.m[15] = 1.0;
        return result;
    };
    Matrix.Rotation = function Rotation(y, x, z) {
        return Matrix.RotationZ(z).multiply(Matrix.RotationX(x)).multiply(Matrix.RotationY(y));
    };
    Matrix.Translation = function Translation(x, y, z) {
        // 1 0 0 x
        // 0 1 0 y
        // 0 0 1 z
        // 0 0 0 1
        var result = Matrix.Identity();
        result.m[12] = x;
        result.m[13] = y;
        result.m[14] = z;
        return result;
    };
    Matrix.Camera = function Camera(cPos, cTarget, cUp) {
        // cZ = (cPos - cTarget) / ||cPos - cTarget|| 
        // cX = (cUp x cZ) / ||cUp x cZ|| 
        // cY = (cZ x cX) / ||cZ x cX|| 
        var cZ = cTarget.subtract(cPos); cZ.normalize();
        var cX = Vector3.Cross(cUp, cZ); cX.normalize();
        var cY = Vector3.Cross(cZ, cX);  cY.normalize();
        var ex = Vector3.Dot(cX, cPos);
        var ey = Vector3.Dot(cY, cPos);
        var ez = Vector3.Dot(cZ, cPos);
        return Matrix.FromValues(cX.x, cY.x, cZ.x, 0, cX.y, cY.y, cZ.y, 0, cX.z, cY.z, cZ.z, 0, -ex, -ey, -ez, 1);
    };
    Matrix.Projection = function Projection(aspect, zn, zf, Vw, Vh) {
        // w 0   0  0
        // 0 h   0  0
        // 0 0   Q  1
        // 0 0 -QZn 0
        // Q = Zf / (Zf - Zn)
        var matrix = Matrix.Zero();
        var ctan = 1.0 / (Math.tan(0.5));
        matrix.m[0] = ctan/aspect;matrix.m[1]=  0.0; matrix.m[2]  =     0.0;          matrix.m[3] =  0.0;
        matrix.m[4] =  0.0;      matrix.m[5] =  ctan; matrix.m[6] =     0.0;          matrix.m[7] =  0.0;
        matrix.m[8] =  0.0;      matrix.m[9] =  0.0; matrix.m[10] = zf/(zf-zn);       matrix.m[11] = 1.0;
        matrix.m[12] = 0.0;      matrix.m[13] = 0.0; matrix.m[14] = (-zn*zf)/(zf-zn); matrix.m[15] = 0.0;
        return matrix;
    };
    return Matrix;
})();
var Vector3 = (function () {
    function Vector3(initialX, initialY, initialZ) {
        this.x = initialX;
        this.y = initialY;
        this.z = initialZ;
    }
    Vector3.prototype.toString = function () { return "{X: " + this.x + " Y:" + this.y + " Z:" + this.z + "}" };
    Vector3.prototype.add = function (otherVector) { return new Vector3(this.x + otherVector.x, this.y + otherVector.y, this.z + otherVector.z) };
    Vector3.prototype.subtract = function (otherVector) { return new Vector3(this.x - otherVector.x, this.y - otherVector.y, this.z - otherVector.z) };
    Vector3.prototype.scale = function (scale) { return new Vector3(this.x * scale, this.y * scale, this.z * scale) };
    Vector3.prototype.multiply = function (otherVector) { return new Vector3(this.x * otherVector.x, this.y * otherVector.y, this.z * otherVector.z) };
    Vector3.Dot = function Dot(left, right) { return (left.x * right.x + left.y * right.y + left.z * right.z) };
    Vector3.prototype.normalize = function () {
        var len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
        if(len === 0) return;
        var num = 1.0 / len;
        this.x *= num;
        this.y *= num;
        this.z *= num;
    };
    Vector3.Cross = function Cross(left, right) {
        var x = left.y * right.z - left.z * right.y;
        var y = left.z * right.x - left.x * right.z;
        var z = left.x * right.y - left.y * right.x;
        return new Vector3(x, y, z);
    };
    Vector3.TransformCoordinates = function TransformCoordinates(vector, transformation) {
        var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]) + transformation.m[12];
        var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]) + transformation.m[13];
        var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]) + transformation.m[14];
        var w = (vector.x * transformation.m[3]) + (vector.y * transformation.m[7]) + (vector.z * transformation.m[11]) + transformation.m[15];
        return new Vector3(x / w, y / w, z / w);
    };
    Vector3.TransformNormal = function (vector, transformation) {
        var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]);
        var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]);
        var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]);
        return new Vector3(x, y, z);
    };
    Vector3.TransformPoint = function TransformCoordinates(p, P) {
        // Mat * point
        //                 x
        //                 y
        //                 z
        //                 1
        // 0  1  2  3
        // 4  5  6  7
        // 8  9  10 11
        // 12 13 14 15
        var x = (p.x * P.m[0]) + (p.y * P.m[1]) + (p.z * P.m[2]) + P.m[3];
        var y = (p.x * P.m[4]) + (p.y * P.m[5]) + (p.z * P.m[6]) + P.m[7];
        var z = (p.x * P.m[8]) + (p.y * P.m[9]) + (p.z * P.m[10]) + P.m[11];
        var w = (p.x * P.m[12]) + (p.y * P.m[13]) + (p.z * P.m[14]) + P.m[15];
        return new Vector3(x / w, y / w, z / w);
    };
    return Vector3;
})();


var SoftEngine;
(function (SoftEngine) {
    SoftEngine.Camera = (function () {
        function Camera() {
            this.Position = new Vector3(0, 0, 0);
            this.Target = new Vector3(0, 0, 0);
        }
        return Camera;
    })();    

    SoftEngine.Mesh = (function () {
        function Mesh(name) {
            this.name = name;
            this.Vertices = [];
            this.Faces = [];
            this.Rotation = new Vector3(0, 0, 0);
            this.Position = new Vector3(0, 0, 0);
        }
        return Mesh;
    })();

    SoftEngine.Device = (function () {
        function Device(canvas) {
            this.workingCanvas = canvas;
            this.workingWidth = canvas.width;
            this.workingHeight = canvas.height;
            this.workingContext = this.workingCanvas.getContext("2d");
            this.lightPosition = new Vector3(0, 0, 200);
            this.color = new Color4(180, 80, 20, 1 );
            this.lightIntensity = new Vector3(0.2, 0.2, 0.2);
        }

        Device.prototype.clear = function () {
            this.workingContext.clearRect(0, 0, this.workingWidth, this.workingHeight);
            this.backbuffer = this.workingContext.getImageData(0, 0, this.workingWidth, this.workingHeight);
        };

        Device.prototype.present = function () { 
            this.workingContext.putImageData(this.backbuffer, 0, 0);
        };

        Device.prototype.interpolate = function (min, max, gradient) { 
            // Interpolating the value between 2 vertices 
            // min is the starting point, max the ending point
            // and gradient the % between the 2 points
            return min + (max - min) * Math.max(0, Math.min(gradient, 1));
        };

        Device.prototype.putPixel = function (x, y, z, color) {
            this.backbufferdata = this.backbuffer.data;
            var index = ((x >> 0) + (y >> 0) * this.workingWidth) * 4;
            this.backbufferdata[index] = color.r * 255;
            this.backbufferdata[index+1] = color.g * 255;
            this.backbufferdata[index+2] = color.b * 255;
            this.backbufferdata[index+3] = color.a * 255;
        };

        Device.prototype.drawPoint = function (point, color) {
            if(point.x >= 0 && point.y >= 0 && point.x < this.workingWidth && point.y < this.workingHeight) {
                this.putPixel(point.x, point.y, point.z, color);
            }
        };

        Device.prototype.project = function (vertex, transMat, world) {
            var point2d = Vector3.TransformCoordinates(vertex.Coordinates, transMat);
            var point3DWorld = Vector3.TransformCoordinates(vertex.Coordinates, world);
            var normal3DWorld = Vector3.TransformNormal(vertex.Normal, world);
            var x = point2d.x * this.workingWidth + this.workingWidth / 2.0;
            var y = -point2d.y * this.workingHeight + this.workingHeight / 2.0;
            return ({
                Coordinates: new Vector3(x, y, point2d.z),
                Normal: normal3DWorld,
                WorldCoordinates: point3DWorld
            });
        };

        Device.prototype.render = function (camera, mesh) {
            this.cameraPosition = camera.Position;
            var rot = mesh.Rotation; 
            var pos = mesh.Position;
            var worldMatrix = Matrix.Rotation(rot.y, rot.x, rot.z).multiply(Matrix.Translation(pos.x, pos.y, pos.z));
            var viewMatrix = Matrix.Camera(camera.Position, camera.Target, new Vector3(0, 1.0, 0));
            var projectionMatrix = Matrix.Projection(this.workingWidth / this.workingHeight, 0.01, 1.0);
            var transformMatrix =  worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);
            mesh.Faces.forEach((face) => {
                var vertexA = mesh.Vertices[face.A]; var vertexB = mesh.Vertices[face.B]; var vertexC = mesh.Vertices[face.C];
                var A = this.project(vertexA, transformMatrix, worldMatrix);
                var B = this.project(vertexB, transformMatrix, worldMatrix);
                var C = this.project(vertexC, transformMatrix, worldMatrix);
                if (this.getCrossProductFromBackFaceCulling(A, B, C).z > 0) {
                    if (showMesh.checked) { 
                        this.drawLine(A, B); this.drawLine(B, C); this.drawLine(C, A);
                    } else {
                        this.drawTriangle(A, B, C);
                    }
                }
            });
        };

        Device.prototype.getCrossProductFromBackFaceCulling = function (pixelA, pixelB, pixelC) {
            x1 = pixelA.Coordinates.x; x2 = pixelB.Coordinates.x; x3 = pixelC.Coordinates.x;
            y1 = pixelA.Coordinates.y; y2 = pixelB.Coordinates.y; y3 = pixelC.Coordinates.y;
            return Vector3.Cross(new Vector3(x2 - x1, y2 - y1, 0), new Vector3(x3 - x1, y3 - y1, 0));
        };

        Device.prototype.drawLine = function (vertex0, vertex1) {
            var point0 = vertex0.Coordinates; var point1 = vertex1.Coordinates;
            var x0 = point0.x >> 0; var y0 = point0.y >> 0; 
            var x1 = point1.x >> 0; var y1 = point1.y >> 0;
            var dx = Math.abs(x1 - x0); var dy = Math.abs(y1 - y0);
            var sx = (x0 < x1) ? 1 : -1; var sy = (y0 < y1) ? 1 : -1;
            var err = dx - dy;
            while(true) {
                this.drawPoint(new Vector3(x0, y0, 0), this.color);
                if((x0 == x1) && (y0 == y1)) break;
                var e2 = 2 * err;
                if(e2 > -dy) { err -= dy; x0 += sx; }
                if(e2 < dx) { err += dx; y0 += sy; }
            }
        };

        Device.prototype.drawTriangle = function (v1, v2, v3) {
            // Sort vertices based on Y value
            if (v1.Coordinates.y > v2.Coordinates.y) { var temp = v2; v2 = v1; v1 = temp; }
            if (v2.Coordinates.y > v3.Coordinates.y) { var temp = v2; v2 = v3; v3 = temp; }
            if (v1.Coordinates.y > v2.Coordinates.y) { var temp = v2; v2 = v1; v1 = temp; }
            var p1 = v1.Coordinates; var p2 = v2.Coordinates; var p3 = v3.Coordinates; var dP1P2; var dP1P3;
            (p2.y - p1.y > 0) ? dP1P2 = (p2.x - p1.x) / (p2.y - p1.y) : dP1P2 = 0;
            (p3.y - p1.y > 0) ? dP1P3 = (p3.x - p1.x) / (p3.y - p1.y) : dP1P3 = 0;
            for (var y = p1.y >> 0; y <= p3.y >> 0; y++) {
                if (dP1P2 > dP1P3) {
                    y < p2.y ? this.processScanLine(y, v1, v3, v1, v2) : this.processScanLine(y, v1, v3, v2, v3);
                } else {
                    y < p2.y ? this.processScanLine(y, v1, v2, v1, v3) : this.processScanLine(y, v2, v3, v1, v3);
                }
            }
        };

        Device.prototype.processScanLine = function (currentY, va, vb, vc, vd) {
            // Phong equation: I = Ia + Id + Is
            // Ia = Ka (uniform constant value) AMBIENT
            // Id = Kd * I * (n dotprod l)      DIFFUSION 
            // Is = Ks * I * (r dotprod v)^m    SPECULAR
            var Ia = new Vector3(0.001, 0.001, 0.001);
            var pa = va.Coordinates; var pb = vb.Coordinates; var pc = vc.Coordinates; var pd = vd.Coordinates;
            var gradient1 = pa.y != pb.y ? (currentY - pa.y) / (pb.y - pa.y) : 1;
            var gradient2 = pc.y != pd.y ? (currentY - pc.y) / (pd.y - pc.y) : 1;
            var sx = this.interpolate(pa.x, pb.x, gradient1) >> 0; 
            var ex = this.interpolate(pc.x, pd.x, gradient2) >> 0;
            var z1 = this.interpolate(pa.z, pb.z, gradient1); 
            var z2 = this.interpolate(pc.z, pd.z, gradient2);
            var v1Normal = va.Normal.scale(1 - gradient1).add(vb.Normal.scale(gradient1));
            var v2Normal = vc.Normal.scale(1 - gradient2).add(vd.Normal.scale(gradient2));
            for (var x = sx; x < ex; x++) {
                var gradient = (x - sx) / (ex - sx);
                var z = this.interpolate(z1, z2, gradient);
                var currentPoint = new Vector3(x, currentY, z);
                var v3Normal = v1Normal.scale(1 - gradient).add(v2Normal.scale(gradient));
                var lightDirection = this.getLightDirection(currentPoint);
                var Id = this.computeDiffusionReflection(v3Normal, lightDirection);
                var Is = this.computeSpecularReflection(currentPoint, v3Normal, lightDirection);
                var phong = Ia.add(Id).add(Is);
                this.drawPoint(currentPoint, new Color4(this.color.r * phong.x, this.color.g * phong.y, this.color.b * phong.z, 1));
            }
        };

        Device.prototype.computeSpecularReflection = function (vertex, normal, lightDirection) {
            var Ks = new Vector3(0.5, 0.5, 0.5);
            var v = this.cameraPosition.subtract(vertex);
            v.normalize();
            var ndotl = Math.max(0, Vector3.Dot(normal, lightDirection));
            var r = normal.scale(2 * ndotl).subtract(lightDirection);
            var rdotv = Math.max(0, Math.pow(Vector3.Dot(r, v), 200));
            return Ks.multiply(this.lightIntensity).scale(rdotv);
        };

        Device.prototype.computeDiffusionReflection = function (normal, lightDirection) {
            var Kd = new Vector3(0.1, 0.1, 0.1);
            var ndotl = Math.max(0, Vector3.Dot(normal, lightDirection));
            return Kd.multiply(this.lightIntensity).scale(ndotl);
        };

        Device.prototype.getLightDirection = function (vertex) {
            var lightDirection = this.lightPosition.subtract(vertex);
            lightDirection.normalize();
            return lightDirection;
        }
        
        return Device;
    })();

})(SoftEngine || (SoftEngine = {}));

var canvas; var device; var canvasMesh; var meshes = []; var camera;
var showMesh = document.getElementById("mesh");
var checkBox = document.getElementById("rotate");
var cylinderHeight = document.getElementById("height");
var cylinderDivisions = document.getElementById("divisions");
var cylinderRadius = document.getElementById("radius");
document.addEventListener("DOMContentLoaded", init, false);

function getCylinderMesh() {
    var n = Number(cylinderDivisions.value);
    var height = Number(cylinderHeight.value);
    var radius = Number(cylinderRadius.value);
    var stepTheta = 2 * Math.PI / n;
    var mesh = new SoftEngine.Mesh("Cylinder");
    var i; var curX; var curZ; var start; var end;
    var meshVertices = new Array((4 * n) + 2);
    var normalVectors = new Array((4 * n) + 2);
    // Middle of top base vertices and its normals
    meshVertices[0] = new Vector3(0, height, 0);
    normalVectors[0] = new Vector3(0, 1, 0);
    // Side of top base vertices and its normals
    start = 1; end = n;
    for (i = start; i <= end; i++) {
        curX = radius * Number(Math.cos(stepTheta * (i-1)).toFixed(2));
        curZ = radius * Number(Math.sin(stepTheta * (i-1)).toFixed(2));
        normalVectors[i] = new Vector3(0, 1, 0);
        meshVertices[i] = new Vector3(curX, height, curZ);
    }
    // Middle of bottom base vertex and its normal
    meshVertices[(4 * n) + 1] = new Vector3(0, 0, 0);
    normalVectors[(4 * n) + 1] = new Vector3(0, -1, 0);
    // Side of bottom base vertices and its normals
    start = (3 * n) + 1; end = 4 * n;
    for (i = start; i <= end; i ++) {
        curX = radius * Number(Math.cos(stepTheta * (i-1)).toFixed(2));
        curZ = radius * Number(Math.sin(stepTheta * (i-1)).toFixed(2));
        normalVectors[i] = new Vector3(0, -1, 0);
        meshVertices[i] = new Vector3(curX, 0, curZ);
    }
    // Side surface vertices and its normals
    start = n + 1; end = 2 * n; var P;
    for (i = start; i <= end; i++) {
        P = meshVertices[i - n];
        meshVertices[i] = P;
        normalVectors[i] = new Vector3(P.x / radius, 0, P.z / radius);
    }
    // Side surface vertices and its normals
    start = (2 * n) + 1; end = 3 * n;
    for (i = start; i <= end; i++) {
        P = meshVertices[i + n];
        meshVertices[i] = P;
        normalVectors[i] = new Vector3(P.x / radius, 0, P.z / radius);
    }
    var triangleFaces = new Array(4 * n);
    // Top base triangles
    start = 0; end = n - 1;
    for (i = start; i <= end; i++) {
        var vertexB = (i + 2) % (n + 1) === 0 ? 1 : (i + 2);
        triangleFaces[i] = { A: 0, B: vertexB, C: i + 1 };
    }
    // Bottom base triangles
    start = 3 * n; end = (4 * n) - 2;
    for (i = start; i <= end; i++) {
        triangleFaces[i] = { A: (4 * n) + 1, B: i + 1, C: i + 2 };
    }
    triangleFaces[(4 * n) - 1] = { A: (4 * n) + 1, B: (4 * n), C: (3 * n) + 1 };
    // Side surface triangles (four cases ...)
    start = n; end = (2 * n) - 2;
    for (i = start; i <= end; i++) {
        triangleFaces[i] = { A: i + 1, B: i + 2, C: i + 1 + n };
    }
    triangleFaces[(2 * n) - 1] = { A: 2 * n, B: n + 1, C: 3 * n}
    start = 2 * n; end = (3 * n) - 2;
    for (i = start; i <= end; i++) {
        triangleFaces[i] = { A: i + 1, B: i + 2 - n, C: i + 2 };
    }
    triangleFaces[(3 * n) - 1] = { A: 3 * n, B: n + 1, C: (2 * n) + 1}
    mesh.Faces = triangleFaces;
    mesh.Vertices = meshVertices.map((element, index) => {
        return {
            Coordinates: meshVertices[index],
            Normal: normalVectors[index],
        }
    })
    return mesh;
}

function init() {
    canvas = document.getElementById("cnv");
    camera = new SoftEngine.Camera();
    device = new SoftEngine.Device(canvas);
    canvasMesh = getCylinderMesh();
    camera.Position = new Vector3(0, 0, 20);
    camera.Target = new Vector3(0, 0, 0);
    requestAnimationFrame(drawingLoop);
}

function drawingLoop() {
    if (canvasMesh) {
        device.clear();
        if (checkBox.checked) {
            canvasMesh.Rotation.x += 0.005;
            canvasMesh.Rotation.z += 0.005;
        }
        device.render(camera, canvasMesh);
        device.present();
        requestAnimationFrame(drawingLoop);
    }
}

var mouseX; var mouseY; var mouseClicked = false; var differenceX; var differenceY;

function startMouse(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    mouseClicked = true;
}

function resetMesh() {
    canvasMesh = null;
    device.clear();
    canvasMesh = getCylinderMesh();
    requestAnimationFrame(drawingLoop);
}

function handleMouse(event) {
    if (mouseClicked) {
        differenceX = (mouseX - event.clientX) / 5000;
        differenceY = (mouseY - event.clientY) / 5000;
        if (differenceX) canvasMesh.Rotation.x += differenceX;
        if (differenceY) canvasMesh.Rotation.z += differenceY;
    }
}

function stopMouse(event) { mouseClicked = false; }

function wheelStart(event) {  camera.Position.z += event.deltaY / 100; }

function handleKeyboard(event) {
    if (event.code === "ArrowUp") camera.Target.y -= 0.5;
    if (event.code === "ArrowDown") camera.Target.y += 0.5;
    if (event.code === "ArrowLeft") camera.Target.x -= 0.5;
    if (event.code === "ArrowRight") camera.Target.x += 0.5;
}

document.addEventListener("mousedown", startMouse, false);
document.addEventListener("mousemove", handleMouse, false);
document.addEventListener("mouseup", stopMouse, false);
document.addEventListener("wheel", wheelStart, false);
document.addEventListener("keydown", handleKeyboard, false);