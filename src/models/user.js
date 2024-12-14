import { Timestamp } from 'firebase/firestore';

class UserProfile {
    constructor({
        id = null,
        userName,
        email,
        phoneNumber,
        address,
        avatarUrl,
        role,
        createAt = null
    }) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.avatarUrl = avatarUrl;
        this.role = role;
        this.createAt = createAt || new Date();
    }

    toString() {
        return `UserProfile(id:${this.id}, userName: ${this.userName}, email: ${this.email}, phoneNumber: ${this.phoneNumber}, ` +
            `address: ${this.address}, avatarUrl: ${this.avatarUrl}, role: ${this.role})`;
    }

    toMap() {
        return {
            userName: this.userName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            address: this.address,
            avatarUrl: this.avatarUrl,
            role: this.role,
            createAt: Timestamp.fromDate(this.createAt),
        };
    }

    static fromMap(data) {
        return new UserProfile({
            userName: data.userName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            avatarUrl: data.avatarUrl,
            role: data.role,
            createAt: data.createAt ? data.createAt.toDate() : null,  // Handle Firestore timestamp conversion
        });
    }
}

export default UserProfile;
