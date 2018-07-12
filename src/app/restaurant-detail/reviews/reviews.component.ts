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

  reviews: Observable<any>;

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.reviews = this.restaurantsService.reviewsOfRestaurant(
      this.route.parent.snapshot.params['id']
    );
  }
}
