"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, email, password, created_at) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.getId = () => {
            return this.id;
        };
        this.getName = () => {
            return this.name;
        };
        this.getEmail = () => {
            return this.email;
        };
        this.getPassword = () => {
            return this.password;
        };
        this.getCreatedAt = () => {
            return this.created_at;
        };
        this.setName = (input) => {
            this.name = input;
        };
        this.setEmail = (input) => {
            this.email = input;
        };
        this.setPassword = (input) => {
            this.password = input;
        };
        this.setCreatedAt = (input) => {
            this.created_at = input;
        };
    }
}
exports.User = User;
const user = new User("1", "bruna", "email@email.com", "jhdjhsdjhsd", "agora");
user.getName;
user.setName("Raoni");
console.log(user);
//# sourceMappingURL=User.js.map