'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

export async function shareMealAction(formData) {

    const meal = {
        title: formData.get('title'),
        image: formData.get('image'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    };

    await saveMeal(meal);
    revalidatePath('/meals');
    redirect('/meals');
}