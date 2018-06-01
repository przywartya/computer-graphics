var Matrix = (function () {
    function Matrix() {
        this.m = [];
    }
    Matrix.prototype.isIdentity = function () {
        if(this.m[0] != 1.0 || this.m[5] != 1.0 || this.m[10] != 1.0 || this.m[15] != 1.0) {
            return false;
        }
        if(this.m[12] != 0.0 || this.m[13] != 0.0 || this.m[14] != 0.0 || this.m[4] != 0.0 || this.m[6] != 0.0 || this.m[7] != 0.0 || this.m[8] != 0.0 || this.m[9] != 0.0 || this.m[11] != 0.0 || this.m[12] != 0.0 || this.m[13] != 0.0 || this.m[14] != 0.0) {
            return false;
        }
        return true;
    };
    Matrix.prototype.determinant = function () {
        var temp1 = (this.m[10] * this.m[15]) - (this.m[11] * this.m[14]);
        var temp2 = (this.m[9] * this.m[15]) - (this.m[11] * this.m[13]);
        var temp3 = (this.m[9] * this.m[14]) - (this.m[10] * this.m[13]);
        var temp4 = (this.m[8] * this.m[15]) - (this.m[11] * this.m[12]);
        var temp5 = (this.m[8] * this.m[14]) - (this.m[10] * this.m[12]);
        var temp6 = (this.m[8] * this.m[13]) - (this.m[9] * this.m[12]);
        return ((((this.m[0] * (((this.m[5] * temp1) - (this.m[6] * temp2)) + (this.m[7] * temp3))) - (this.m[1] * (((this.m[4] * temp1) - (this.m[6] * temp4)) + (this.m[7] * temp5)))) + (this.m[2] * (((this.m[4] * temp2) - (this.m[5] * temp4)) + (this.m[7] * temp6)))) - (this.m[3] * (((this.m[4] * temp3) - (this.m[5] * temp5)) + (this.m[6] * temp6))));
    };
    Matrix.prototype.toArray = function () {
        return this.m;
    };
    Matrix.prototype.invert = function () {
        var l1 = this.m[0];
        var l2 = this.m[1];
        var l3 = this.m[2];
        var l4 = this.m[3];
        var l5 = this.m[4];
        var l6 = this.m[5];
        var l7 = this.m[6];
        var l8 = this.m[7];
        var l9 = this.m[8];
        var l10 = this.m[9];
        var l11 = this.m[10];
        var l12 = this.m[11];
        var l13 = this.m[12];
        var l14 = this.m[13];
        var l15 = this.m[14];
        var l16 = this.m[15];
        var l17 = (l11 * l16) - (l12 * l15);
        var l18 = (l10 * l16) - (l12 * l14);
        var l19 = (l10 * l15) - (l11 * l14);
        var l20 = (l9 * l16) - (l12 * l13);
        var l21 = (l9 * l15) - (l11 * l13);
        var l22 = (l9 * l14) - (l10 * l13);
        var l23 = ((l6 * l17) - (l7 * l18)) + (l8 * l19);
        var l24 = -(((l5 * l17) - (l7 * l20)) + (l8 * l21));
        var l25 = ((l5 * l18) - (l6 * l20)) + (l8 * l22);
        var l26 = -(((l5 * l19) - (l6 * l21)) + (l7 * l22));
        var l27 = 1.0 / ((((l1 * l23) + (l2 * l24)) + (l3 * l25)) + (l4 * l26));
        var l28 = (l7 * l16) - (l8 * l15);
        var l29 = (l6 * l16) - (l8 * l14);
        var l30 = (l6 * l15) - (l7 * l14);
        var l31 = (l5 * l16) - (l8 * l13);
        var l32 = (l5 * l15) - (l7 * l13);
        var l33 = (l5 * l14) - (l6 * l13);
        var l34 = (l7 * l12) - (l8 * l11);
        var l35 = (l6 * l12) - (l8 * l10);
        var l36 = (l6 * l11) - (l7 * l10);
        var l37 = (l5 * l12) - (l8 * l9);
        var l38 = (l5 * l11) - (l7 * l9);
        var l39 = (l5 * l10) - (l6 * l9);
        this.m[0] = l23 * l27;
        this.m[4] = l24 * l27;
        this.m[8] = l25 * l27;
        this.m[12] = l26 * l27;
        this.m[1] = -(((l2 * l17) - (l3 * l18)) + (l4 * l19)) * l27;
        this.m[5] = (((l1 * l17) - (l3 * l20)) + (l4 * l21)) * l27;
        this.m[9] = -(((l1 * l18) - (l2 * l20)) + (l4 * l22)) * l27;
        this.m[13] = (((l1 * l19) - (l2 * l21)) + (l3 * l22)) * l27;
        this.m[2] = (((l2 * l28) - (l3 * l29)) + (l4 * l30)) * l27;
        this.m[6] = -(((l1 * l28) - (l3 * l31)) + (l4 * l32)) * l27;
        this.m[10] = (((l1 * l29) - (l2 * l31)) + (l4 * l33)) * l27;
        this.m[14] = -(((l1 * l30) - (l2 * l32)) + (l3 * l33)) * l27;
        this.m[3] = -(((l2 * l34) - (l3 * l35)) + (l4 * l36)) * l27;
        this.m[7] = (((l1 * l34) - (l3 * l37)) + (l4 * l38)) * l27;
        this.m[11] = -(((l1 * l35) - (l2 * l37)) + (l4 * l39)) * l27;
        this.m[15] = (((l1 * l36) - (l2 * l38)) + (l3 * l39)) * l27;
    };
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
    Matrix.prototype.equals = function (value) {
        return (this.m[0] === value.m[0] && this.m[1] === value.m[1] && this.m[2] === value.m[2] && this.m[3] === value.m[3] && this.m[4] === value.m[4] && this.m[5] === value.m[5] && this.m[6] === value.m[6] && this.m[7] === value.m[7] && this.m[8] === value.m[8] && this.m[9] === value.m[9] && this.m[10] === value.m[10] && this.m[11] === value.m[11] && this.m[12] === value.m[12] && this.m[13] === value.m[13] && this.m[14] === value.m[14] && this.m[15] === value.m[15]);
    };
    Matrix.FromValues = function FromValues(initialM11, initialM12, initialM13, initialM14, initialM21, initialM22, initialM23, initialM24, initialM31, initialM32, initialM33, initialM34, initialM41, initialM42, initialM43, initialM44) {
        var result = new Matrix();
        result.m[0] = initialM11;
        result.m[1] = initialM12;
        result.m[2] = initialM13;
        result.m[3] = initialM14;
        result.m[4] = initialM21;
        result.m[5] = initialM22;
        result.m[6] = initialM23;
        result.m[7] = initialM24;
        result.m[8] = initialM31;
        result.m[9] = initialM32;
        result.m[10] = initialM33;
        result.m[11] = initialM34;
        result.m[12] = initialM41;
        result.m[13] = initialM42;
        result.m[14] = initialM43;
        result.m[15] = initialM44;
        return result;
    };
    Matrix.Identity = function Identity() {
        return Matrix.FromValues(1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 1.0);
    };
    Matrix.Zero = function Zero() {
        return Matrix.FromValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    };
    Matrix.Copy = function Copy(source) {
        return Matrix.FromValues(source.m[0], source.m[1], source.m[2], source.m[3], source.m[4], source.m[5], source.m[6], source.m[7], source.m[8], source.m[9], source.m[10], source.m[11], source.m[12], source.m[13], source.m[14], source.m[15]);
    };
    Matrix.Transpose = function Transpose(matrix) {
        var result = new Matrix();
        result.m[0] = matrix.m[0];
        result.m[1] = matrix.m[4];
        result.m[2] = matrix.m[8];
        result.m[3] = matrix.m[12];
        result.m[4] = matrix.m[1];
        result.m[5] = matrix.m[5];
        result.m[6] = matrix.m[9];
        result.m[7] = matrix.m[13];
        result.m[8] = matrix.m[2];
        result.m[9] = matrix.m[6];
        result.m[10] = matrix.m[10];
        result.m[11] = matrix.m[14];
        result.m[12] = matrix.m[3];
        result.m[13] = matrix.m[7];
        result.m[14] = matrix.m[11];
        result.m[15] = matrix.m[15];
        return result;
    };
    Matrix.RotationX = function RotationX(angle) {
        var result = Matrix.Zero();
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        result.m[0] = 1.0;
        result.m[15] = 1.0;
        result.m[5] = c;
        result.m[10] = c;
        result.m[9] = -s;
        result.m[6] = s;
        return result;
    };
    Matrix.RotationY = function RotationY(angle) {
        var result = Matrix.Zero();
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        result.m[5] = 1.0;
        result.m[15] = 1.0;
        result.m[0] = c;
        result.m[2] = -s;
        result.m[8] = s;
        result.m[10] = c;
        return result;
    };
    Matrix.RotationZ = function RotationZ(angle) {
        var result = Matrix.Zero();
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        result.m[10] = 1.0;
        result.m[15] = 1.0;
        result.m[0] = c;
        result.m[1] = s;
        result.m[4] = -s;
        result.m[5] = c;
        return result;
    };
    Matrix.RotationAxis = function RotationAxis(axis, angle) {
        var s = Math.sin(-angle);
        var c = Math.cos(-angle);
        var c1 = 1 - c;
        axis.normalize();
        var result = Matrix.Zero();
        result.m[0] = (axis.x * axis.x) * c1 + c;
        result.m[1] = (axis.x * axis.y) * c1 - (axis.z * s);
        result.m[2] = (axis.x * axis.z) * c1 + (axis.y * s);
        result.m[3] = 0.0;
        result.m[4] = (axis.y * axis.x) * c1 + (axis.z * s);
        result.m[5] = (axis.y * axis.y) * c1 + c;
        result.m[6] = (axis.y * axis.z) * c1 - (axis.x * s);
        result.m[7] = 0.0;
        result.m[8] = (axis.z * axis.x) * c1 - (axis.y * s);
        result.m[9] = (axis.z * axis.y) * c1 + (axis.x * s);
        result.m[10] = (axis.z * axis.z) * c1 + c;
        result.m[11] = 0.0;
        result.m[15] = 1.0;
        return result;
    };
    Matrix.RotationYawPitchRoll = function RotationYawPitchRoll(yaw, pitch, roll) {
        return Matrix.RotationZ(roll).multiply(Matrix.RotationX(pitch)).multiply(Matrix.RotationY(yaw));
    };
    Matrix.Scaling = function Scaling(x, y, z) {
        var result = Matrix.Zero();
        result.m[0] = x;
        result.m[5] = y;
        result.m[10] = z;
        result.m[15] = 1.0;
        return result;
    };
    Matrix.Translation = function Translation(x, y, z) {
        var result = Matrix.Identity();
        result.m[12] = x;
        result.m[13] = y;
        result.m[14] = z;
        return result;
    };
    Matrix.LookAtLH = function LookAtLH(eye, target, up) {
        var zAxis = target.subtract(eye);
        zAxis.normalize();
        var xAxis = Vector3.Cross(up, zAxis);
        xAxis.normalize();
        var yAxis = Vector3.Cross(zAxis, xAxis);
        yAxis.normalize();
        var ex = -Vector3.Dot(xAxis, eye);
        var ey = -Vector3.Dot(yAxis, eye);
        var ez = -Vector3.Dot(zAxis, eye);
        return Matrix.FromValues(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, ex, ey, ez, 1);
    };
    Matrix.PerspectiveLH = function PerspectiveLH(width, height, znear, zfar) {
        var matrix = Matrix.Zero();
        matrix.m[0] = (2.0 * znear) / width;
        matrix.m[1] = matrix.m[2] = matrix.m[3] = 0.0;
        matrix.m[5] = (2.0 * znear) / height;
        matrix.m[4] = matrix.m[6] = matrix.m[7] = 0.0;
        matrix.m[10] = -zfar / (znear - zfar);
        matrix.m[8] = matrix.m[9] = 0.0;
        matrix.m[11] = 1.0;
        matrix.m[12] = matrix.m[13] = matrix.m[15] = 0.0;
        matrix.m[14] = (znear * zfar) / (znear - zfar);
        return matrix;
    };
    Matrix.PerspectiveFovLH = function PerspectiveFovLH(fov, aspect, znear, zfar) {
        var matrix = Matrix.Zero();
        var tan = 1.0 / (Math.tan(fov * 0.5));
        matrix.m[0] = tan / aspect;
        matrix.m[1] = matrix.m[2] = matrix.m[3] = 0.0;
        matrix.m[5] = tan;
        matrix.m[4] = matrix.m[6] = matrix.m[7] = 0.0;
        matrix.m[8] = matrix.m[9] = 0.0;
        matrix.m[10] = -zfar / (znear - zfar);
        matrix.m[11] = 1.0;
        matrix.m[12] = matrix.m[13] = matrix.m[15] = 0.0;
        matrix.m[14] = (znear * zfar) / (znear - zfar);
        return matrix;
    };
    return Matrix;
})();
var Color4 = (function () {
    function Color4(initialR, initialG, initialB, initialA) {
        this.r = initialR;
        this.g = initialG;
        this.b = initialB;
        this.a = initialA;
    }
    Color4.prototype.toString = function () {
        return "{R: " + this.r + " G:" + this.g + " B:" + this.b + " A:" + this.a + "}";
    };
    return Color4;
})();
var Vector2 = (function () {
    function Vector2(initialX, initialY) {
        this.x = initialX;
        this.y = initialY;
    }
    Vector2.prototype.toString = function () {
        return "{X: " + this.x + " Y:" + this.y + "}";
    };
    Vector2.prototype.add = function (otherVector) {
        return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
    };
    Vector2.prototype.subtract = function (otherVector) {
        return new Vector2(this.x - otherVector.x, this.y - otherVector.y);
    };
    Vector2.prototype.negate = function () {
        return new Vector2(-this.x, -this.y);
    };
    Vector2.prototype.scale = function (scale) {
        return new Vector2(this.x * scale, this.y * scale);
    };
    Vector2.prototype.equals = function (otherVector) {
        return this.x === otherVector.x && this.y === otherVector.y;
    };
    Vector2.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector2.prototype.lengthSquared = function () {
        return (this.x * this.x + this.y * this.y);
    };
    Vector2.prototype.normalize = function () {
        var len = this.length();
        if(len === 0) {
            return;
        }
        var num = 1.0 / len;
        this.x *= num;
        this.y *= num;
    };
    Vector2.Zero = function Zero() {
        return new Vector2(0, 0);
    };
    Vector2.Copy = function Copy(source) {
        return new Vector2(source.x, source.y);
    };
    Vector2.Normalize = function Normalize(vector) {
        var newVector = Vector2.Copy(vector);
        newVector.normalize();
        return newVector;
    };
    Vector2.Minimize = function Minimize(left, right) {
        var x = (left.x < right.x) ? left.x : right.x;
        var y = (left.y < right.y) ? left.y : right.y;
        return new Vector2(x, y);
    };
    Vector2.Maximize = function Maximize(left, right) {
        var x = (left.x > right.x) ? left.x : right.x;
        var y = (left.y > right.y) ? left.y : right.y;
        return new Vector2(x, y);
    };
    Vector2.Transform = function Transform(vector, transformation) {
        var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]);
        var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]);
        return new Vector2(x, y);
    };
    Vector2.Distance = function Distance(value1, value2) {
        return Math.sqrt(Vector2.DistanceSquared(value1, value2));
    };
    Vector2.DistanceSquared = function DistanceSquared(value1, value2) {
        var x = value1.x - value2.x;
        var y = value1.y - value2.y;
        return (x * x) + (y * y);
    };
    return Vector2;
})();
var Vector3 = (function () {
    function Vector3(initialX, initialY, initialZ) {
        this.x = initialX;
        this.y = initialY;
        this.z = initialZ;
    }
    Vector3.prototype.toString = function () {
        return "{X: " + this.x + " Y:" + this.y + " Z:" + this.z + "}";
    };
    Vector3.prototype.add = function (otherVector) {
        return new Vector3(this.x + otherVector.x, this.y + otherVector.y, this.z + otherVector.z);
    };
    Vector3.prototype.subtract = function (otherVector) {
        return new Vector3(this.x - otherVector.x, this.y - otherVector.y, this.z - otherVector.z);
    };
    Vector3.prototype.negate = function () {
        return new Vector3(-this.x, -this.y, -this.z);
    };
    Vector3.prototype.scale = function (scale) {
        return new Vector3(this.x * scale, this.y * scale, this.z * scale);
    };
    Vector3.prototype.equals = function (otherVector) {
        return this.x === otherVector.x && this.y === otherVector.y && this.z === otherVector.z;
    };
    Vector3.prototype.multiply = function (otherVector) {
        return new Vector3(this.x * otherVector.x, this.y * otherVector.y, this.z * otherVector.z);
    };
    Vector3.prototype.divide = function (otherVector) {
        return new Vector3(this.x / otherVector.x, this.y / otherVector.y, this.z / otherVector.z);
    };
    Vector3.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    Vector3.prototype.lengthSquared = function () {
        return (this.x * this.x + this.y * this.y + this.z * this.z);
    };
    Vector3.prototype.normalize = function () {
        var len = this.length();
        if(len === 0) {
            return;
        }
        var num = 1.0 / len;
        this.x *= num;
        this.y *= num;
        this.z *= num;
    };
    Vector3.FromArray = function FromArray(array, offset) {
        if(!offset) {
            offset = 0;
        }
        return new Vector3(array[offset], array[offset + 1], array[offset + 2]);
    };
    Vector3.Zero = function Zero() {
        return new Vector3(0, 0, 0);
    };
    Vector3.Up = function Up() {
        return new Vector3(0, 1.0, 0);
    };
    Vector3.Copy = function Copy(source) {
        return new Vector3(source.x, source.y, source.z);
    };
    Vector3.TransformCoordinates = function TransformCoordinates(vector, transformation) {
        var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]) + transformation.m[12];
        var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]) + transformation.m[13];
        var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]) + transformation.m[14];
        var w = (vector.x * transformation.m[3]) + (vector.y * transformation.m[7]) + (vector.z * transformation.m[11]) + transformation.m[15];
        return new Vector3(x / w, y / w, z / w);
    };
    Vector3.TransformNormal = function TransformNormal(vector, transformation) {
        var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]);
        var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]);
        var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]);
        return new Vector3(x, y, z);
    };
    Vector3.Dot = function Dot(left, right) {
        return (left.x * right.x + left.y * right.y + left.z * right.z);
    };
    Vector3.Cross = function Cross(left, right) {
        var x = left.y * right.z - left.z * right.y;
        var y = left.z * right.x - left.x * right.z;
        var z = left.x * right.y - left.y * right.x;
        return new Vector3(x, y, z);
    };
    Vector3.Normalize = function Normalize(vector) {
        var newVector = Vector3.Copy(vector);
        newVector.normalize();
        return newVector;
    };
    Vector3.Distance = function Distance(value1, value2) {
        return Math.sqrt(Vector3.DistanceSquared(value1, value2));
    };
    Vector3.DistanceSquared = function DistanceSquared(value1, value2) {
        var x = value1.x - value2.x;
        var y = value1.y - value2.y;
        var z = value1.z - value2.z;
        return (x * x) + (y * y) + (z * z);
    };
    return Vector3;
})();


var SoftEngine;
(function (SoftEngine) {
    SoftEngine.Camera = (function () {
        function Camera() {
            this.Position = Vector3.Zero();
            this.Target = Vector3.Zero();
        }
        return Camera;
    })();    

    SoftEngine.Mesh = (function () {
        function Mesh(name, verticesCount, facesCount) {
            this.name = name;
            this.Vertices = new Array(verticesCount);
            this.Faces = new Array(facesCount);
            this.Rotation = Vector3.Zero();
            this.Position = Vector3.Zero();
        }
        return Mesh;
    })();

    SoftEngine.Device = (function () {
        function Device(canvas) {
            // Note: the back buffer size is equal to the number of pixels to draw
            // on screen (width*height) * 4 (R,G,B & Alpha values).
            this.workingCanvas = canvas;
            this.workingWidth = canvas.width;
            this.workingHeight = canvas.height;
            this.workingContext = this.workingCanvas.getContext("2d");
            this.depthbuffer = new Array(this.workingWidth * this.workingHeight);
        }

        // This function is called to clear the back buffer with a specific color
        Device.prototype.clear = function () {
            // Clearing with black color by default
            this.workingContext.clearRect(0, 0, this.workingWidth, this.workingHeight);
            // once cleared with black pixels, we're getting back the associated image data to clear out back buffer
            this.backbuffer = this.workingContext.getImageData(0, 0, this.workingWidth, this.workingHeight);
            // Clearing depth buffer
            for (var i = 0; i < this.depthbuffer.length; i++) {
                // Max possible value 
                this.depthbuffer[i] = 10000000;
            }
        };

        // Once everything is ready, we can flush the back buffer into the front buffer. 
        Device.prototype.present = function () {
            this.workingContext.putImageData(this.backbuffer, 0, 0);
        };

        // Called to put a pixel on screen at a specific X,Y coordinates
        Device.prototype.putPixel = function (x, y, z, color) {
            this.backbufferdata = this.backbuffer.data;
            // As we have a 1-D Array for our back buffer
            // we need to know the equivalent cell index in 1-D based
            // on the 2D coordinates of the screen
            var index = ((x >> 0) + (y >> 0) * this.workingWidth);
            var index4 = index * 4;
        
            if(this.depthbuffer[index] < z) {
                return; // Discard
            }
        
            this.depthbuffer[index] = z;
        
            // RGBA color space is used by the HTML5 canvas 
            this.backbufferdata[index4] = color.r * 255;
            this.backbufferdata[index4 + 1] = color.g * 255;
            this.backbufferdata[index4 + 2] = color.b * 255;
            this.backbufferdata[index4 + 3] = color.a * 255;
        };

        // Project takes some 3D coordinates and transform them
        // in 2D coordinates using the transformation matrix
        Device.prototype.project = function (coord, transMat) {
            // transforming the coordinates
            var point = Vector3.TransformCoordinates(coord, transMat);
            // The transformed coordinates will be based on coordinate system
            // starting on the center of the screen. But drawing on screen normally starts
            // from top left. We then need to transform them again to have x:0, y:0 on top left.
            var x = point.x * this.workingWidth + this.workingWidth / 2.0;
            var y = -point.y * this.workingHeight + this.workingHeight / 2.0;
            return (new Vector3(x, y, point.z));
        };

        // drawPoint calls putPixel but does the clipping operation before
        Device.prototype.drawPoint = function (point, color) {
            // Clipping what's visible on screen
            if(point.x >= 0 && point.y >= 0 && point.x < this.workingWidth && point.y < this.workingHeight) {
                // Drawing a point
                this.putPixel(point.x, point.y, point.z, color);
            }
        };

        // The main method of the engine that re-compute each vertex projection
        // during each frame
        Device.prototype.render = function (camera, meshes) {
            // To understand this part, please read the prerequisites resources
            var viewMatrix = Matrix.LookAtLH(camera.Position, camera.Target, Vector3.Up());
            var projectionMatrix = Matrix.PerspectiveFovLH(0.78, this.workingWidth / this.workingHeight, 0.01, 1.0);
            for (var index = 0; index < meshes.length; index++) {
                // current mesh to work on
                var cMesh = meshes[index];
                var rotY = cMesh.Rotation.y, rotX =  cMesh.Rotation.x, rotZ = cMesh.Rotation.z;
                var posY = cMesh.Position.y, posX =  cMesh.Position.x, posZ = cMesh.Position.z;
                // Beware to apply rotation before translation
                var worldMatrix = Matrix.RotationYawPitchRoll(rotY, rotX, rotZ).multiply(Matrix.Translation(posX, posY, posZ));

                var transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);

                for (var indexFaces = 0; indexFaces < cMesh.Faces.length; indexFaces++) {
                    var currentFace = cMesh.Faces[indexFaces];
                    var vertexA = cMesh.Vertices[currentFace.A];
                    var vertexB = cMesh.Vertices[currentFace.B];
                    var vertexC = cMesh.Vertices[currentFace.C];

                    var pixelA = this.project(vertexA, transformMatrix);
                    var pixelB = this.project(vertexB, transformMatrix);
                    var pixelC = this.project(vertexC, transformMatrix);

                    
                }
                for (var indexFaces = 0; indexFaces < cMesh.Faces.length; indexFaces++) {
                    var currentFace = cMesh.Faces[indexFaces];
                    var vertexA = cMesh.Vertices[currentFace.A];
                    var vertexB = cMesh.Vertices[currentFace.B];
                    var vertexC = cMesh.Vertices[currentFace.C];
                
                    var pixelA = this.project(vertexA, transformMatrix);
                    var pixelB = this.project(vertexB, transformMatrix);
                    var pixelC = this.project(vertexC, transformMatrix);
                
                    var color = 0.25 + ((indexFaces % cMesh.Faces.length) / cMesh.Faces.length) * 0.75;
                    // var color = 255;
                    this.drawTriangle(pixelA, pixelB, pixelC, new Color4(color, 0, color, 1));
                    // this.drawLine(pixelA, pixelB);
                    // this.drawLine(pixelB, pixelC);
                    // this.drawLine(pixelC, pixelA);
                }
            }
        };

        Device.prototype.drawLine = function (point0, point1) {
            var x0 = point0.x >> 0;
            var y0 = point0.y >> 0;
            var x1 = point1.x >> 0;
            var y1 = point1.y >> 0;
            var dx = Math.abs(x1 - x0);
            var dy = Math.abs(y1 - y0);
            var sx = (x0 < x1) ? 1 : -1;
            var sy = (y0 < y1) ? 1 : -1;
            var err = dx - dy;
            while(true) {
                this.drawPoint(new Vector2(x0, y0), new Color4(255, 0, 255, 1));
                if((x0 == x1) && (y0 == y1)) break;
                var e2 = 2 * err;
                if(e2 > -dy) { err -= dy; x0 += sx; }
                if(e2 < dx) { err += dx; y0 += sy; }
            }
        };

        // Clamping values to keep them between 0 and 1
        Device.prototype.clamp = function (value, min, max) {
            if (typeof min === "undefined") { min = 0; }
            if (typeof max === "undefined") { max = 1; }
            return Math.max(min, Math.min(value, max));
        };

        // Interpolating the value between 2 vertices 
        // min is the starting point, max the ending point
        // and gradient the % between the 2 points
        Device.prototype.interpolate = function (min, max, gradient) {
            return min + (max - min) * this.clamp(gradient);
        };
        
        // drawing line between 2 points from left to right
        // papb -> pcpd
        // pa, pb, pc, pd must then be sorted before
        Device.prototype.processScanLine = function (y, pa, pb, pc, pd, color) {
            // Thanks to current Y, we can compute the gradient to compute others values like
            // the starting X (sx) and ending X (ex) to draw between
            // if pa.Y == pb.Y or pc.Y == pd.Y, gradient is forced to 1
            var gradient1 = pa.y != pb.y ? (y - pa.y) / (pb.y - pa.y) : 1;
            var gradient2 = pc.y != pd.y ? (y - pc.y) / (pd.y - pc.y) : 1;

            var sx = this.interpolate(pa.x, pb.x, gradient1) >> 0;
            var ex = this.interpolate(pc.x, pd.x, gradient2) >> 0;

            // starting Z & ending Z
            var z1 = this.interpolate(pa.z, pb.z, gradient1);
            var z2 = this.interpolate(pc.z, pd.z, gradient2);

            // drawing a line from left (sx) to right (ex) 
            for(var x = sx; x < ex; x++) {
                var gradient = (x - sx) / (ex - sx);
                var z = this.interpolate(z1, z2, gradient);
                this.drawPoint(new Vector3(x, y, z), color);
            }
        };

        Device.prototype.drawTriangle = function (p1, p2, p3, color) {
            if(p1.y > p2.y) {
                var temp = p2;
                p2 = p1;
                p1 = temp;
            }
            if(p2.y > p3.y) {
                var temp = p2;
                p2 = p3;
                p3 = temp;
            }
            if(p1.y > p2.y) {
                var temp = p2;
                p2 = p1;
                p1 = temp;
            }
            var dP1P2; var dP1P3;
            if(p2.y - p1.y > 0) {
                dP1P2 = (p2.x - p1.x) / (p2.y - p1.y);
            } else {
                dP1P2 = 0;
            }
        
            if(p3.y - p1.y > 0) {
                dP1P3 = (p3.x - p1.x) / (p3.y - p1.y);
            } else {
                dP1P3 = 0;
            }
            if(dP1P2 > dP1P3) {
                for(var y = p1.y >> 0; y <= p3.y >> 0; y++) {
                    if(y < p2.y) {
                        this.processScanLine(y, p1, p3, p1, p2, color);
                    } else {
                        this.processScanLine(y, p1, p3, p2, p3, color);
                    }
                }
            }
            else {
                for(var y = p1.y >> 0; y <= p3.y >> 0; y++) {
                    if(y < p2.y) {
                        this.processScanLine(y, p1, p2, p1, p3, color);
                    } else {
                        this.processScanLine(y, p2, p3, p1, p3, color);
                    }
                }
            }
        };
        return Device;
    })();

})(SoftEngine || (SoftEngine = {}));

var canvas;
var device;
var canvasMesh;
var meshes = [];
var mera;

document.addEventListener("DOMContentLoaded", init, false);

function getCubicMesh() {
    var mesh = new SoftEngine.Mesh("Cube", 8, 12);

    mesh.Vertices[0] = new Vector3(-1, 1, 1);
    mesh.Vertices[1] = new Vector3(1, 1, 1);
    mesh.Vertices[2] = new Vector3(-1, -1, 1);
    mesh.Vertices[3] = new Vector3(1, -1, 1);

    mesh.Vertices[4] = new Vector3(-1, 1, -1);
    mesh.Vertices[5] = new Vector3(1, 1, -1);
    mesh.Vertices[6] = new Vector3(1, -1, -1);
    mesh.Vertices[7] = new Vector3(-1, -1, -1);

    mesh.Faces[0] = { A:0, B:1, C:2 };
    mesh.Faces[1] = { A:1, B:2, C:3 };
    mesh.Faces[2] = { A:1, B:3, C:6 };
    mesh.Faces[3] = { A:1, B:5, C:6 };
    mesh.Faces[4] = { A:0, B:1, C:4 };
    mesh.Faces[5] = { A:1, B:4, C:5 };
    mesh.Faces[6] = { A:2, B:3, C:7 };
    mesh.Faces[7] = { A:3, B:6, C:7 };
    mesh.Faces[8] = { A:0, B:2, C:7 };
    mesh.Faces[9] = { A:0, B:4, C:7 };
    mesh.Faces[10] = { A:4, B:5, C:6 };
    mesh.Faces[11] = { A:4, B:6, C:7 };

    return mesh;
}

function getCylinderMesh() {
    var centerOf = -1.5;
    var sides = 13;
    var height = 3;
    var stepTheta = 2 * Math.PI / sides;

    var sizeOfVertices = 2 * (sides + 1);
    var sizeOfFaces = 2 * sides;
    
    var mesh = new SoftEngine.Mesh("Cylinder", sizeOfVertices, sizeOfFaces);
    var theta = 0;
    var i;
    var curX, curY;
    var nextIndex;

    mesh.Vertices[0] = new Vector3(0, 0, centerOf + height);

    // Top Cap
    for (i = 1;i < sides + 1; i += 1) {
        curX = Number(Math.cos(theta).toFixed(2));
        curY = Number(Math.sin(theta).toFixed(2));
        mesh.Vertices[i] = new Vector3(curX, curY, centerOf + height);
        theta += stepTheta;
    }
    for (i = 1; i <= sides; i += 1) {
        nextIndex = (i + 1) % (sides + 1);
        if (nextIndex == 0) nextIndex = 1;
        mesh.Faces[i - 1] = { A:0, B:i, C:nextIndex };
    }
    // Bottom Cap
    height = centerOf;
    theta = 0;
    var lastIndex = 2 * sides + 1;
    for (i = sides + 1; i < lastIndex; i += 1) {
        curX = Number(Math.cos(theta).toFixed(2));
        curY = Number(Math.sin(theta).toFixed(2));
        mesh.Vertices[i] = new Vector3(curX, curY, height);
        theta += stepTheta;
    }
    mesh.Vertices[lastIndex] = new Vector3(0, 0, height);
    for (i = sides + 1; i < lastIndex; i += 1) {
        nextIndex = (i + 1) % lastIndex;
        if (nextIndex == 0) nextIndex = sides + 1;
        mesh.Faces[i - 1] = { A:lastIndex, B:i, C:nextIndex };
    }
    // Top to bottom triangles
    var j = sides + 1;
    var m = 0;
    while (m < sides) {
        nextIndex = (m + 1) % (sides + 1);
        if (nextIndex === 0) nextIndex = 1;
        nextNextIndex = (nextIndex + 1) % (sides + 1);
        if (nextNextIndex === 0) nextNextIndex = 1;

        mesh.Faces.push({
            A: j,
            B: nextIndex,
            C: nextNextIndex
        });
        j += 1; m += 1;
    }
    // Bottom to top triangles
    m = sides + 1;
    j = 2;
    while (m < lastIndex) {
        nextIndex = (m + 1) % (lastIndex);
        if (nextIndex === 0) nextIndex = 1;
        mesh.Faces.push({
            A: j,
            B: m,
            C: nextIndex
        });
        j += 1; m += 1;
    }
    // mesh.Faces[12] = { A:7, B:1, C:2 };
    // mesh.Faces[13] = { A:8, B:2, C:3 };
    // mesh.Faces[14] = { A:9, B:3, C:4 };
    // mesh.Faces[15] = { A:10, B:4, C:5 };
    // mesh.Faces[16] = { A:11, B:5, C:6 };
    // mesh.Faces[17] = { A:12, B:6, C:1 };

    // mesh.Faces[18] = { A:2, B:7, C:8 };
    // mesh.Faces[19] = { A:3, B:8, C:9 };
    // mesh.Faces[20] = { A:4, B:9, C:10 };
    // mesh.Faces[21] = { A:5, B:10, C:11 };
    // mesh.Faces[22] = { A:6, B:11, C:12 };
    // mesh.Faces[23] = { A:7, B:12, C:1 };

    console.log(mesh.Faces)
    console.log(mesh.Vertices)
    return mesh;
}

function init() {
    canvas = document.getElementById("cnv");
    mera = new SoftEngine.Camera();
    device = new SoftEngine.Device(canvas);
    canvasMesh = getCylinderMesh();
    meshes.push(canvasMesh);
    mera.Position = new Vector3(0, 0, 15);
    mera.Target = new Vector3(0, 0, 0);
    requestAnimationFrame(drawingLoop);
}

function drawingLoop() {
    device.clear();
    canvasMesh.Rotation.x += 0.001;
    canvasMesh.Rotation.y += 0.001;
    // canvasMesh.Rotation.z += 0.05;
    device.render(mera, meshes);
    device.present();
    requestAnimationFrame(drawingLoop);
}

var mouseX; var mouseY; var mouseClicked = false; var differenceX; var differenceY;

function startMouse(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    mouseClicked = true;
}


function handleMouse(event) {
    if (mouseClicked) {
        differenceX = (mouseX - event.clientX) / 5000;
        differenceY = (mouseY - event.clientY) / 5000;
        if (differenceX) canvasMesh.Rotation.y += differenceX;
        if (differenceY) canvasMesh.Rotation.x += differenceY;
    }
}

function stopMouse(event) { mouseClicked = false; }

function wheelStart(event) {
    mera.Position.z += event.deltaY / 100;
}

function handleKeyboard(event) {
    if (event.code === "KeyW") mera.Target.y -= 0.1;
    if (event.code === "KeyS") mera.Target.y += 0.1;
    if (event.code === "KeyA") mera.Target.x -= 0.1;
    if (event.code === "KeyD") mera.Target.x += 0.1;
}

document.addEventListener("mousedown", startMouse, false);
document.addEventListener("mousemove", handleMouse, false);
document.addEventListener("mouseup", stopMouse, false);
document.addEventListener("wheel", wheelStart, false);
document.addEventListener("keydown", handleKeyboard, false);