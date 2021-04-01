export const howManyReaded = (news) => {
  return news.filter((newsItem) => {
    return newsItem.isRead === false;
  }).length;
};

export const translateDateFromServer = (date) => {
  return new Date(date).toLocaleString(`ru`, {
    day: `numeric`,
    year: `numeric`,
    month: `long`,
    hour: `2-digit`,
    minute: `2-digit`,
  });
};
