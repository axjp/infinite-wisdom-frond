export interface Review {
  id_reviews?: string;
  review_rating: number;
  review_date: Date;
  review_comment: string;
  is_approved: boolean;
  customer_id: string;
  book_id: string;
}
