import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonCard = () => (
<SkeletonTheme color="#202020" highlightColor="#444">
        <ul className="card-list">
          {Array(9)
            .fill()
            .map((item, index) => (
              <li key={index}>
                <Skeleton height={180} />
                <h4 className="card-title">
                  <Skeleton height={20} width={'70%'} />
                </h4>
                <p className="card-channel">
                  <Skeleton width={'30%'} />
                </p>
              </li>
            ))}
        </ul>
      </SkeletonTheme>
);

export default SkeletonCard;
