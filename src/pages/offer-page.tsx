import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import CommentForm from '../components/comment-form';
import HeaderScreen from '../components/header';
import { Review, OfferScreenProps } from '../types/type';

function OfferScreen({ offers, reviews, apartCount, email }: OfferScreenProps): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const offer = offers.find((item) => item.id === id) || null;
  const offerReviews = reviews.filter((review) => review.offerId === id);
  const [allReviews, setAllReviews] = useState<Review[]>(offerReviews);

  const handleCommentSubmit = (newComment: { rating: number; review: string }) => {
    if (!id) {
      return;
    }

    const newReview: Review = {
      id: (allReviews.length + 1).toString(),
      offerId: id,
      user: { name: 'New User', avatarUrl: '/img/avatar.svg' },
      rating: newComment.rating,
      date: new Date().toISOString(),
      comment: newComment.review,
    };

    setAllReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  if (!offer) {
    return <h1 className="offer__not-found">Offer not found</h1>;
  }

  const altText: string = offer.title || 'Default Title';

  return (
    <>
      <HeaderScreen apartCount={apartCount} email={email} />
      <main className="page__main page__main--offer">
        <Helmet>
          <title>6 cities: {offer.title}</title>
        </Helmet>
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.slice(0, 6).map((image: string) => (
                <div className="offer__image-wrapper" key={image}> {/* Используйте image как ключ */}
                  <img
                    className="place-card__image"
                    src={image || 'default-image.png'}
                    width="260"
                    height="200"
                    alt={altText}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <h1 className="offer__name">{offer.title}</h1>
            <p>{offer.description}</p>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews &middot; <span className="reviews__amount">{allReviews.length}</span>
              </h2>
              <ul className="reviews__list">
                {allReviews.map((review) => (
                  <li className="reviews__item" key={review.id}>
                    <div className="reviews__user user">
                      <div className="reviews__avatar-wrapper user__avatar-wrapper">
                        <img
                          className="reviews__avatar user__avatar"
                          src={review.user.avatarUrl}
                          width="54"
                          height="54"
                          alt={review.user.name}
                        />
                      </div>
                      <span className="reviews__user-name">{review.user.name}</span>
                    </div>
                    <p className="reviews__text">{review.comment}</p>
                    <time className="reviews__time" dateTime={review.date}>
                      {new Date(review.date).toLocaleDateString()}
                    </time>
                  </li>
                ))}
              </ul>
              <CommentForm onSubmit={handleCommentSubmit} />
            </section>
          </div>
        </section>
      </main>
    </>
  );
}

export default OfferScreen;
