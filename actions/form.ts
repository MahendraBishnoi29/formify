"use server";

import prisma from "@/lib/prisma";
import { FormSchemaType, formSchema } from "@/schemas/formSchema";
import { currentUser } from "@clerk/nextjs";

class UserNotFoundError extends Error {}

export async function GetFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user?.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;
  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = submissionRate / visits + 100;
  }

  const bouncRate = 100 - submissionRate;

  return { visits, submissions, submissionRate, bouncRate };
}

export async function CreateForm(data: FormSchemaType) {
  const validation = formSchema.safeParse(data);
  const user = await currentUser();
  const { name, description } = data;

  if (!validation.success) {
    throw new Error("invalid form");
  }

  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    },
  });

  if (!form) {
    throw new Error("something went wrong!");
  }

  return form.id;
}

export async function GetForms() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
