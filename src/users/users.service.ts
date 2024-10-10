import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {
    private users = [
        {
            'id': 1,
            'name': "hadhi",
            'email': 'hadhi@gmail.com',
            'role': "INTERN"
        },
        {
            'id': 2,
            'name': "hassan",
            'email': 'hassan@gmail.com',
            'role': "ENGNIEER"
        },
        {
            'id': 3,
            'name': "dilu",
            'email': 'dilu@gmail.com',
            'role': "ADMIN"
        },
        {
            'id': 4,
            'name': "shalu",
            'email': 'shalu@gmail.com',
            'role': "INTERN"
        },
        {
            'id': 5,
            'name': "mon",
            'email': 'mon@gmail.com',
            'role': "INTERN"
        }
    ];


    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException("User Role Not Found")
            return rolesArray
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if (!user) throw new NotFoundException('User Not Found')
        return user
    }

    create(createUserDto: CreateUserDto) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);

        const newUser = {
            id: userByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto };
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number) {
        const removeUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);

        return removeUser
    }
}