import { Request, Response } from "express";
import ProjectTemplate from "../models/ProjectTemplate";

interface Project {
  projid: number;
  projectname: string;
  projectdescription: string;
  projectstart: Date;
  projectend: Date;
  projectlink: string;
}

export const createProject = async (req: Request, res: Response) => {
  const projectData: Project = req.body;
  //console.log(req.body);
  try {
    const existingProject = await ProjectTemplate.findOne({
      where: {
        projectname: projectData.projectname,
      },
    });

    if (existingProject) {
      res.status(400).json({ message: "Project name already exists" });
      return;
    }

    const startDate: Date = new Date(projectData.projectstart);
    const endDate: Date = new Date(projectData.projectend);

    //console.log(startDate, endDate);

    const newProject = ProjectTemplate.build({
      projectname: projectData.projectname,
      projectdescription: projectData.projectdescription,
      projectstart: startDate,
      projectend: endDate,
      projectlink: projectData.projectlink,
    } as ProjectTemplate);

    console.log(startDate, endDate);
    await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      projectDetails: newProject,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred during project creation", error });
  }
};
