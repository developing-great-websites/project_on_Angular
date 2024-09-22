import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {Dialog} from "@angular/cdk/dialog";
import {RequestComponent} from "../../shared/components/request/request.component";
import {ArticleService} from "../../shared/services/article.service";
import {ArticleType} from "../../../types/article.type";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }

  customOptionsReviews: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 25,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
    },
    nav: false
  }

  services = [
    {
      image: 'service1.png',
      category: 'Создание сайтов',
      description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: 'От 7 500₽'
    },
    {
      image: 'service2.png',
      category: 'Продвижение',
      description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: 'От 3 500₽'
    },
    {
      image: 'service3.png',
      category: 'Реклама',
      description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: 'От 1 000₽'
    },
    {
      image: 'service4.png',
      category: 'Копирайтинг',
      description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: 'От 750₽'
    }
  ]

  descriptions = [
    {
      textForSpan: 'Мастерски вовлекаем аудиторию в процесс.',
      textForDiv: 'Мы увеличиваем процент вовлечённости за короткий промежуток времени.'
    },
    {
      textForSpan: 'Разрабатываем бомбическую визуальную концепцию.',
      textForDiv: 'Наши специалисты знают как создать уникальный образ вашего проекта.'
    },
    {
      textForSpan: 'Создаём мощные воронки с помощью текстов.',
      textForDiv: 'Наши копирайтеры создают не только вкусные текста, но и классные воронки.'
    },
    {
      textForSpan: 'Помогаем продавать больше.',
      textForDiv: 'Мы не только помогаем разработать стратегию по продажам, но также корректируем её под нужды заказчика.'
    },
  ]

  reviews = [
    {
      name: 'Станислав',
      image: 'review1.png',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      name: 'Алёна',
      image: 'review2.png',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      name: 'Мария',
      image: 'review3.png',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
  ]

  topArticles: ArticleType[] = [];

  constructor(private dialog: Dialog,
              private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService.getTopArticles()
      .subscribe((data: ArticleType[]) => {
        this.topArticles = data;
      })
  }

  openModal(category: string): void {
    this.dialog.open<string>(RequestComponent, {data: category});
  }

}
