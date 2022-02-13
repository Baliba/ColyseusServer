"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zoe = void 0;
const schema_1 = require("@colyseus/schema");
const Position_1 = require("./Position");
class Zoe extends schema_1.Schema {
    constructor(a, b, id, n) {
        super();
        this.firstZoe = false;
        this.A = a;
        this.B = b;
        this.is_double = id;
        this.name = n;
        this.firstZoe = false;
    }
    setAngle(a) {
        this.angle = a;
    }
    setScale(a) {
        this.scale = a;
    }
    setPosition(p) {
        this.position = p;
    }
    setFirst(fz) {
        this.firstZoe = fz;
    }
    isFirst() {
        return this.firstZoe;
    }
    getA() {
        return this.A;
    }
    getB() {
        return this.B;
    }
    setA(a) {
        this.A = a;
    }
    setB(a) {
        this.B = a;
    }
    getName() {
        return this.name;
    }
    getZoeUp() {
        return this.up;
    }
    getZoeDown() {
        return this.down;
    }
    getZoeLeft() {
        return this.left;
    }
    getZoeRight() {
        return this.right;
    }
    addZoeV1(zoe) {
        if (this.A == zoe.getA() || this.A == zoe.getB()) {
            this.setZoeUp(zoe);
        }
        else if (this.B == zoe.getA() || this.B == zoe.getB()) {
            this.setZoeDown(zoe);
        }
    }
    setZoeUp(zoe) {
        zoe.setZoeDown(this);
        this.up = zoe;
    }
    setZoeDown(zoe) {
        zoe.setZoeUp(this);
        this.down = zoe;
    }
    setZoeLeft(zoe) {
        zoe.setZoeUp(this);
        this.left = zoe;
    }
    setZoeRight(zoe) {
        zoe.setZoeDown(this);
        this.right = zoe;
    }
}
__decorate([
    schema_1.type("number")
], Zoe.prototype, "A", void 0);
__decorate([
    schema_1.type("number")
], Zoe.prototype, "B", void 0);
__decorate([
    schema_1.type("boolean")
], Zoe.prototype, "is_double", void 0);
__decorate([
    schema_1.type("string")
], Zoe.prototype, "name", void 0);
__decorate([
    schema_1.type("boolean")
], Zoe.prototype, "firstZoe", void 0);
__decorate([
    schema_1.type(Zoe)
], Zoe.prototype, "up", void 0);
__decorate([
    schema_1.type(Zoe)
], Zoe.prototype, "down", void 0);
__decorate([
    schema_1.type(Zoe)
], Zoe.prototype, "right", void 0);
__decorate([
    schema_1.type(Zoe)
], Zoe.prototype, "left", void 0);
__decorate([
    schema_1.type(Position_1.Position)
], Zoe.prototype, "position", void 0);
__decorate([
    schema_1.type("number")
], Zoe.prototype, "angle", void 0);
__decorate([
    schema_1.type("number")
], Zoe.prototype, "scale", void 0);
exports.Zoe = Zoe;
