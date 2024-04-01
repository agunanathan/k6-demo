import {
  describe,
  expect,
} from "https://jslib.k6.io/k6chaijs/4.3.4.2/index.js";
import http from "k6/http";
import { sleep } from "k6";

export default function (
  setupReservationData,
  setupUpdatedReservationData,
  setupDSCardPaymentData,
  tokenizedCardNumber,
  getPNRComparisonResponse,
  getShoppingCartInfo
) {
  describe("test for load test", () => {
    const { createReservationResponse, requestHeaders } = setupReservationData(
      MOCK_ONEWAY_NONSTOP_DOMESTIC_1ADT_RANDOM_DATE
    );
    const totalAmount = getTotalFromDlxReservation(createReservationResponse);
    const createPaymentResponse = setupDSCardPaymentData(
      MOCK_DS_CARD_EN(totalAmount, tokenizedCardNumber(requestHeaders)),
      requestHeaders
    );
    expect(
      getCBPaymentStatus(createPaymentResponse),
      "CB Payment successful"
    ).to.equal(true);
  });
}
