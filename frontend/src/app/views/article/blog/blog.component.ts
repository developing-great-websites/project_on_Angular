import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {CategoryType} from "../../../../types/category.type";
import {CategoryService} from "../../../shared/services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {AppliedFilterType} from "../../../../types/applied-filter.type";
import {filter} from "rxjs";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles: ArticleType[] = [];
  categories: CategoryType[] = [];
  open: boolean = false;

  activeParams: ActiveParamsType = {categories: []};
  appliedFilters: AppliedFilterType[] = [];
  pages: number[] = [];

  @ViewChild('filter', {static: true}) private filterElem!: ElementRef<HTMLElement>;

  constructor(private articleService: ArticleService,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  @HostListener('document:click', ['$event.target'])
  documentClick(target: EventTarget) {
    const elem = target as HTMLElement;
    if (!this.filterElem.nativeElement.contains(elem)) {
      this.open = false;
    }
  }

  ngOnInit(): void {
    this.processBlog();
  }

  processBlog() {
    this.activatedRoute.queryParams.subscribe(params => {
      const activeParams: ActiveParamsType = {categories: []};
      if (params.hasOwnProperty('categories')) {
        activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
      }
      if (params.hasOwnProperty('page')) {
        activeParams.page = +params['page'];
      } else {
        activeParams.page = 1;
      }

      this.activeParams = activeParams;
      console.log(this.activeParams);

      this.categoryService.getCategories().subscribe((categories: CategoryType[]) => {
        this.categories = categories;
        const appliedFilters: CategoryType[] = this.categories.filter(category =>
          this.activeParams.categories.some(activeCategory => activeCategory === category.url));

        this.appliedFilters = appliedFilters.map(filter => ({name: filter.name, urlParam: filter.url}));
      });

      this.articleService.getArticles(this.activeParams)
        .subscribe(data => {
          this.pages = [];
          for (let i = 1; i <= data.pages; i++) {
            this.pages.push(i);
          }
          console.log(this.pages.length)
          this.articles = data.items;
        });
    });
  }

  toggle(): void {
    this.open = !this.open;
  }

  isActiveFilter(category: CategoryType) {
    return this.appliedFilters.some(filter => filter.name === category.name);
  }

  updateFilterParam(category: CategoryType) {
    const foundCategory = this.activeParams.categories.find(activeCategory => activeCategory === category.url);
    if (foundCategory) {
     this.activeParams.categories = this.activeParams.categories.filter(activeCategory => activeCategory !== category.url);
    } else {
      // this.activeParams.categories = [... this.activeParams.categories, category.url];
      this.activeParams.categories.push(category.url);
    }
    this.activeParams.page = 1;
    this.open = false;

    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    })
  }

  removeAppliedFilter(appliedFilter: AppliedFilterType) {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== appliedFilter.urlParam);

    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  openPage(page: number) {
    this.activeParams.page = page;

    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;

      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;

      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }

}
