const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.VIRTUAL,
            password_hash: DataTypes.STRING,
        }, {
            sequelize,
        });
        //Password hash
        this.addHook('beforeSave', async users => {
            if (users.password) {
                users.password_hash = await bcrypt.hash(users.password, 8);
            }
        });

        User.authenticate = async function (username, password) {

            const user = await User.findOne({
                where: { username },
                attributes: ['username', 'email', 'name', 'password_hash']
            });

            if (bcrypt.compareSync(password, user.password_hash)) {
                const { dataValues: { username, email, name } } = user
                return { username, email, name };
            }

            return null
        }

    }
}

module.exports = User;