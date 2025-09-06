import Link from 'next/link';
import style from './page.module.css';
import React, { Suspense } from 'react';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

async function Meals(){
  const meals = await getMeals();
  return <MealsGrid meals={meals}/>
}

const MealsPage = async () => {
  return (
    <>
      <header className={style.header}>
        <h1>
          Delicious meals, created <span className={style.highlight}>by you</span>
        </h1>
        <p>
          Choose your favourite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={style.cta}>
          <Link href='/meals/share'>
            Share Your Favourite Recipe
          </Link>
        </p>
      </header>
      <main className={style.main}>
        <Suspense fallback={<p className={style.loading}>Fethcing  meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  )
}

export default MealsPage
