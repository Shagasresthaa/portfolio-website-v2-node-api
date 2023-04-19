import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "../../config/sequelize";

interface ProjectAttributes {
  projid: number;
  projectname: string;
  projectdescription: string;
  projectstart: Date;
  projectend: Date;
  projectlink: string;
}

interface ProjectCreationAttributes
  extends Optional<ProjectAttributes, "projid"> {}

class ProjectTemplate
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  public projid!: number;
  public projectname!: string;
  public projectdescription!: string;
  public projectstart!: Date;
  public projectend!: Date;
  public projectlink!: string;

  // timestamps!
  public readonly projCreatedAt!: Date;
  public readonly projUpdatedAt!: Date;
}

ProjectTemplate.init(
  {
    projid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    projectname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectdescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectstart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    projectend: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    projectlink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Projects",
  }
);

export default ProjectTemplate;
