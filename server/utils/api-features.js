class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // search with product title
  search() {
    const keyword = this.queryStr.keyword
      ? {
          title: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  // filter with product category and price
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);
    // console.log(queryCopy);

    // for price
    let queryString = JSON.stringify(queryCopy);
    // JSON.stringify(queryCopy) it converts queryCopy to string

    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    // JSON.parse(queryString) it converts queryString to object

    // console.log(queryString);

    return this;
  }

  //   pagination
  pagination(productPerPage) {
    const currPage = Number(this.queryStr.page) || 1;
    const skipPage = productPerPage * (currPage - 1);

    this.query = this.query.limit(productPerPage).skip(skipPage);
    // after equal sign this.query means Product.find()

    return this;
  }
}

export default ApiFeatures;
