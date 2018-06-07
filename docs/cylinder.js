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
    Vector3.TransformCoordinates = function TransformCoordinates(vector, transformation) {
        var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]) + transformation.m[12];
        var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]) + transformation.m[13];
        var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]) + transformation.m[14];
        var w = (vector.x * transformation.m[3]) + (vector.y * transformation.m[7]) + (vector.z * transformation.m[11]) + transformation.m[15];
        return new Vector3(x / w, y / w, z / w);
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
        function Mesh(name) {
            this.name = name;
            this.Vertices = [];
            this.Faces = [];
            this.Rotation = Vector3.Zero();
            this.Position = Vector3.Zero();
        }
        Mesh.prototype.computeFacesNormals = function() {
            for (var indexFaces = 0; indexFaces < this.Faces.length; indexFaces++) {
                var currentFace = this.Faces[indexFaces];

                var vertexA = this.Vertices[currentFace.A];
                var vertexB = this.Vertices[currentFace.B];
                var vertexC = this.Vertices[currentFace.C];
                
                this.Faces[indexFaces].Normal = (vertexA.Normal.add(vertexB.Normal.add(vertexC.Normal))).scale(1 / 3);
                this.Faces[indexFaces].Normal.normalize();
            }
        }
        return Mesh;
    })();

    SoftEngine.Device = (function () {
        function Device(canvas) {
            this.workingCanvas = canvas;
            this.workingWidth = canvas.width;
            this.workingHeight = canvas.height;
            this.workingContext = this.workingCanvas.getContext("2d");
        }
        Device.prototype.clear = function () {
            this.workingContext.clearRect(0, 0, this.workingWidth, this.workingHeight);
            this.backbuffer = this.workingContext.getImageData(0, 0, this.workingWidth, this.workingHeight);
        };
        Device.prototype.present = function () {
            this.workingContext.putImageData(this.backbuffer, 0, 0);
        };
        Device.prototype.clamp = function (value, min, max) {
            if (typeof min === "undefined") { min = 0; }
            if (typeof max === "undefined") { max = 1; }
            return Math.max(min, Math.min(value, max));
        };
        Device.prototype.interpolate = function (min, max, gradient) {
            return min + (max - min) * this.clamp(gradient);
        };
        Device.prototype.putPixel = function (x, y, z, color) {
            this.backbufferdata = this.backbuffer.data;
            var index = ((x >> 0) + (y >> 0) * this.workingWidth) * 4;
            this.backbufferdata[index] = color.r * 255;
            this.backbufferdata[index + 1] = color.g * 255;
            this.backbufferdata[index + 2] = color.b * 255;
            this.backbufferdata[index + 3] = color.a * 255;
        };
        Device.prototype.drawPoint = function (point, color) {
            if(point.x >= 0 && point.y >= 0 && point.x < this.workingWidth && point.y < this.workingHeight) {
                this.putPixel(point.x, point.y, point.z, color);
            }
        };
        Device.prototype.project = function (vertex, transMat, world) {
            var point2d = Vector3.TransformCoordinates(vertex.Coordinates, transMat);
            var point3DWorld = Vector3.TransformCoordinates(vertex.Coordinates, world);
            var normal3DWorld = Vector3.TransformCoordinates(vertex.Normal, world);
            var x = point2d.x * this.workingWidth + this.workingWidth / 2.0;
            var y = -point2d.y * this.workingHeight + this.workingHeight / 2.0;
            return ({
                Coordinates: new Vector3(x, y, point2d.z),
                Normal: normal3DWorld,
                WorldCoordinates: point3DWorld
            });
        };
        Device.prototype.render = function (camera, meshes) {
            var drawType = "SHADE";
            // WORLD VIEW PROJECTION
            var viewMatrix = Matrix.LookAtLH(camera.Position, camera.Target, Vector3.Up());
            var projectionMatrix = Matrix.PerspectiveFovLH(0.78, this.workingWidth / this.workingHeight, 0.01, 1.0);
            for (var index = 0; index < meshes.length; index++) {
                var cMesh = meshes[index];
                var rotY = cMesh.Rotation.y, rotX =  cMesh.Rotation.x, rotZ = cMesh.Rotation.z;
                var posY = cMesh.Position.y, posX =  cMesh.Position.x, posZ = cMesh.Position.z;
                // WORLD
                var worldMatrix = Matrix.RotationYawPitchRoll(rotY, rotX, rotZ).multiply(Matrix.Translation(posX, posY, posZ));
                this.worldMatrix = worldMatrix;
                // VIEW
                var worldView = worldMatrix.multiply(viewMatrix);
                // PROJECTION - transformMatrix = WorldViewProjectionMatrix
                var transformMatrix = worldView.multiply(projectionMatrix);
                for (var indexFaces = 0; indexFaces < cMesh.Faces.length; indexFaces++) {
                    var currentFace = cMesh.Faces[indexFaces];
                    var vertexA = cMesh.Vertices[currentFace.A];
                    var vertexB = cMesh.Vertices[currentFace.B];
                    var vertexC = cMesh.Vertices[currentFace.C];
                    var pixelA = this.project(vertexA, transformMatrix, worldMatrix);
                    var pixelB = this.project(vertexB, transformMatrix, worldMatrix);
                    var pixelC = this.project(vertexC, transformMatrix, worldMatrix);
                    x1 = pixelA.Coordinates.x; x2 = pixelB.Coordinates.x; x3 = pixelC.Coordinates.x;
                    y1 = pixelA.Coordinates.y; y2 = pixelB.Coordinates.y; y3 = pixelC.Coordinates.y;
                    var left = new Vector3(x2 - x1, y2 - y1, 0);
                    var right = new Vector3(x3 - x1, y3 - y1, 0);
                    var crossProduct = Vector3.Cross(left, right);
                    if (crossProduct.z > 0) {
                        if (drawType === "MESH") { 
                            this.drawLine(pixelA, pixelB);
                            this.drawLine(pixelB, pixelC);
                            this.drawLine(pixelC, pixelA);
                        } else if (drawType === "FILL") {
                            var color = 0.25 + ((indexFaces % cMesh.Faces.length) / cMesh.Faces.length) * 0.75;
                            this.drawTriangle(pixelA, pixelB, pixelC, new Color4(color, 0, color, 1 ));
                        } else if (drawType === "SHADE") {
                            this.drawTriangle(pixelA, pixelB, pixelC, new Color4(60, 80, 20, 1 ), camera.Position);
                        }
                    }
                }
            }
        };
        Device.prototype.drawLine = function (vertex0, vertex1) {
            var point0 = vertex0.Coordinates; var point1 = vertex1.Coordinates;
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
                this.drawPoint(new Vector2(x0, y0), new Color4(0, 255, 0, 1));
                if((x0 == x1) && (y0 == y1)) break;
                var e2 = 2 * err;
                if(e2 > -dy) { err -= dy; x0 += sx; }
                if(e2 < dx) { err += dx; y0 += sy; }
            }
        };
        Device.prototype.computeNDotL = function (vertex, normal, lightPosition) {
            var lightDirection = lightPosition.subtract(vertex);
            normal.normalize();
            lightDirection.normalize();
            return Math.max(0, Vector3.Dot(normal, lightDirection));
        };
        Device.prototype.computeSpecularReflection = function (vertex, normal, lightPosition, cameraPos) {
            var m = 25;
            var Ks = new Vector3(0.5, 0.5, 0.5);
            var Il = new Vector3(0.1, 0.1, 0.1);
            // var lightDir3d = Vector3.TransformCoordinates(lightPosition, this.worldMatrix);
            var lightDirection = lightPosition.subtract(vertex);
            var v = cameraPos.subtract(vertex);
            v.normalize();
            normal.normalize();
            lightDirection.normalize();
            var ndotl = Math.max(0, Vector3.Dot(normal, lightDirection));
            var r = normal.scale(2 * ndotl).subtract(lightDirection);
            var rdotv = Math.max(0, Math.pow(Vector3.Dot(r, v), m));
            return Ks.multiply(Il).scale(rdotv);
            // specular is Ks * Il * (r dot v) ^ m
            // v is a unit vector in the direction of the observer
            // var rdotv
            // pozycja kamery ma byc w ukladzie swiata 
            // pozniej odejmuje pozycje kamery od pozycji punktu
            // return Math.max(0, Vector3.Dot(normal, lightDirection));
        };
        
        Device.prototype.processScanLine = function (data, va, vb, vc, vd, color, cameraPos, lightPos) {
            var Ia = new Vector3(0.0005, 0.0005, 0.0005); // AMBIENT REFLECTION
            var Kd = new Vector3(0.1, 0.1, 0.1);
            var lightIntesity = new Vector3(0.1, 0.1, 0.1);
            var pa = va.Coordinates; var pb = vb.Coordinates;
            var pc = vc.Coordinates; var pd = vd.Coordinates;
            var gradient1 = pa.y != pb.y ? (data.currentY - pa.y) / (pb.y - pa.y) : 1;
            var gradient2 = pc.y != pd.y ? (data.currentY - pc.y) / (pd.y - pc.y) : 1;
            var sx = this.interpolate(pa.x, pb.x, gradient1) >> 0; var ex = this.interpolate(pc.x, pd.x, gradient2) >> 0;
            var z1 = this.interpolate(pa.z, pb.z, gradient1); var z2 = this.interpolate(pc.z, pd.z, gradient2);
            var snl = this.interpolate(data.ndotla, data.ndotlb, gradient1);
            var enl = this.interpolate(data.ndotlc, data.ndotld, gradient2);
            for (var x = sx; x < ex; x++) {
                var gradient = (x - sx) / (ex - sx);
                var v1Normal = va.Normal.scale(1 - gradient1).add(vb.Normal.scale(gradient1));
                var v2Normal = vc.Normal.scale(1 - gradient2).add(vd.Normal.scale(gradient2));
                var v3Normal = v1Normal.scale(1 - gradient).add(v2Normal.scale(gradient)); // normal vector at current point
                var z = this.interpolate(z1, z2, gradient);
                var ndotl = this.interpolate(snl, enl, gradient);
                var Id = Kd.multiply(lightIntesity).scale(ndotl);
                var currentPoint = new Vector3(x, data.currentY, z);
                var Is = this.computeSpecularReflection(currentPoint, v3Normal, lightPos, cameraPos);
                var phong = Ia.add(Id).add(Is);
                var phongColor = new Color4(color.r * phong.x, color.g * phong.y, color.b * phong.z, 1);
                this.drawPoint(new Vector3(x, data.currentY, z), phongColor);
            }
        };
        Device.prototype.drawTriangle = function (v1, v2, v3, color, cameraPos) {
            if (v1.Coordinates.y > v2.Coordinates.y) { var temp = v2; v2 = v1; v1 = temp; }
            if (v2.Coordinates.y > v3.Coordinates.y) { var temp = v2; v2 = v3; v3 = temp; }
            if (v1.Coordinates.y > v2.Coordinates.y) { var temp = v2; v2 = v1; v1 = temp; }
            var p1 = v1.Coordinates; var p2 = v2.Coordinates; var p3 = v3.Coordinates;
            var data = {}; var dP1P2; var dP1P3;
            var lightPos = new Vector3(0, 100, 250);
            // Dwie wlasciwosci zrodla swiatla: Pozycja lightPos i kolor Il (light intensity)
            // Phong equation: I = Ia + Id + Is
            // Ia = Ka (uniform constant value)
            // Id = Kd * I * (n dotprod l)
            // I - light intesity constant
            // n - normal vector for the surface
            // l - light vector (between point on surface and light point)
            // Is = Ks * I * (r dotprod v)^m
            // r - reflection vector
            // v - ... nei wiem, narazie bez specular
            var nl1 = this.computeNDotL(v1.WorldCoordinates, v1.Normal, lightPos);
            var nl2 = this.computeNDotL(v2.WorldCoordinates, v2.Normal, lightPos);
            var nl3 = this.computeNDotL(v3.WorldCoordinates, v3.Normal, lightPos);
            if (p2.y - p1.y > 0) dP1P2 = (p2.x - p1.x) / (p2.y - p1.y); else dP1P2 = 0;
            if (p3.y - p1.y > 0) dP1P3 = (p3.x - p1.x) / (p3.y - p1.y); else dP1P3 = 0;
            if (dP1P2 > dP1P3) {
                for (var y = p1.y >> 0; y <= p3.y >> 0; y++) {
                    data.currentY = y;
                    if (y < p2.y) {
                        data.ndotla = nl1;
                        data.ndotlb = nl3;
                        data.ndotlc = nl1;
                        data.ndotld = nl2;
                        this.processScanLine(data, v1, v3, v1, v2, color, cameraPos, lightPos);
                    } else {
                        data.ndotla = nl1;
                        data.ndotlb = nl3;
                        data.ndotlc = nl2;
                        data.ndotld = nl3;
                        this.processScanLine(data, v1, v3, v2, v3, color, cameraPos, lightPos);
                    }
                }
            } else {
                for (var y = p1.y >> 0; y <= p3.y >> 0; y++) {
                    data.currentY = y;
                    if (y < p2.y) {
                        data.ndotla = nl1;
                        data.ndotlb = nl2;
                        data.ndotlc = nl1;
                        data.ndotld = nl3;
                        this.processScanLine(data, v1, v2, v1, v3, color, cameraPos, lightPos);
                    } else {
                        data.ndotla = nl2;
                        data.ndotlb = nl3;
                        data.ndotlc = nl1;
                        data.ndotld = nl3;
                        this.processScanLine(data, v2, v3, v1, v3, color, cameraPos, lightPos);
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
    console.log(meshVertices)
    console.log(normalVectors)
    console.log(triangleFaces)
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
    mera = new SoftEngine.Camera();
    device = new SoftEngine.Device(canvas);
    canvasMesh = getCylinderMesh();
    canvasMesh.computeFacesNormals();
    meshes.push(canvasMesh);
    mera.Position = new Vector3(0, 0, 15);
    mera.Target = new Vector3(0, 0, 0);
    requestAnimationFrame(drawingLoop);
}

function drawingLoop() {
    if (canvasMesh) {
        device.clear();
        if (checkBox.checked) {
            canvasMesh.Rotation.x += 0.007;
            canvasMesh.Rotation.z += 0.007;
        }
        device.render(mera, meshes);
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
    canvasMesh = getCylinderMesh(); meshes.pop(); canvasMesh.computeFacesNormals(); meshes.push(canvasMesh);
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

function wheelStart(event) {  mera.Position.z += event.deltaY / 100; }

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