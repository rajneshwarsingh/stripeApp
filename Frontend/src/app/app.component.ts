import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StripeService, StripeCardComponent } from "ngx-stripe";
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { CommonService } from "./services/common.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: "#666EE8",
        color: "#31325F",
        fontWeight: "300",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: "18px",
        "::placeholder": {
          color: "#CFD7E0",
        },
      },
    },
  };
  elementsOptions: StripeElementsOptions = {
    locale: "en",
  };
  addCard: FormGroup;
  createCharge: FormGroup;
  cardList = [];

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.addCard = this.fb.group({
      name: ["", [Validators.required]],
    });
    this.createCharge = this.fb.group({
      charges: ["", [Validators.required]],
    });
    this.getCardList();
  }

  createToken(): void {
    const name = this.addCard.get("name").value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          let path = "createCustomer";
          let body = {
            name,
            token: result.token.id,
          };
          this.commonService.post(path, body).subscribe((res) => {
            this.getCardList();
          });
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  getCardList(): void {
    let path = "getCustomers";
    this.commonService.get(path).subscribe((res) => {
      if (res.data) {
        this.cardList = res.data;
      } else {
        console.log(res.message);
      }
    });
  }

  makePayment(charges, cardId): void {
    let path = "createCharge";
    let body = {
      charges,
      cardId,
    };
    this.commonService.post(path, body).subscribe((res) => {
      console.log("res", res);
    });
  }

  removeCard(cardId): void {
    let path = "removeCard";
    let body = {
      cardId,
    };
    this.commonService.delete(path, body).subscribe((res) => {
      console.log("res", res);
      this.getCardList();
    });
  }
}
