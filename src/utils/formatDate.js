import moment from "moment";

const formatDate = (date, format="YYYY-MM-DD") => moment(new Date(date)).format(format);

export default formatDate;