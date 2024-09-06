import React from "react";

type TestimonialCardProps = {
  rating: number;
  name: string;
  message: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ rating,name,message }) => {


  const createRatingArray = (length: number): number[] => {
    return Array.from({ length },(_,i) => i + 1);
  }

  const ratingArray = createRatingArray(rating)

  //console.log(rating as number)

  return (
    <div className="border border-foreground/20 backdrop-blur-sm">
      <blockquote className="flex h-full flex-col justify-between p-6 sm:p-8">
        <div>
          <div className="flex gap-0.5 text-green-500">
            {
              ratingArray.map((_,index) => (
                <svg
                  key={index}
                  className="size-5"
                  fill="#0435BE"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))
            }


          </div>

          <div className="mt-4">
            {/*<p className="text-2xl font-bold  sm:text-3xl">Stayin' Alive</p>*/}

            <p className="mt-4 leading-relaxed text-gray-200">
              {message}
            </p>
          </div>
        </div>

        <footer className="mt-4 text-sm font-medium text-gray-500 sm:mt-6">
          &mdash; {name}
        </footer>
      </blockquote>
    </div>
  );
};

export default TestimonialCard;
