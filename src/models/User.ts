import { Model, Optional, DataTypes, Sequelize } from "sequelize";
import sequelize from "../../config/sequelize";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            notNull: true,
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
            notNull: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            notNull: true,
          },
        },
      },
      {
        sequelize,
        modelName: "User",
      }
    );
  }

  static async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const user = await User.create({ username, email, password });
    return user;
  }

  static async deleteUser(id: number): Promise<boolean> {
    const deletedRows = await User.destroy({ where: { id } });

    if (deletedRows > 0) {
      return true;
    } else {
      return false;
    }
  }
}

export default User;
