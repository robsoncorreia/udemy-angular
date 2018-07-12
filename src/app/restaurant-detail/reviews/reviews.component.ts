import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { Observable } from '../../../../node_modules/rxjs/Observable';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Review } from "app/restaurants/restaurant/review.model";

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Review[] = [];

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.restaurantsService.reviewsOfRestaurant(
      this.route.parent.snapshot.params['id']
    ).subscribe( reviews => this.reviews = reviews);
  }
}
