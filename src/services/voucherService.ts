
// Types based on the API specification
export interface VoucherResponse {
  voucher: {
    fragmentable: boolean;
    redeemed: boolean;
    expired: boolean;
    isAppointment: boolean;
    code: string;
    totalValue: number;
    availableValue: number;
    type: string;
    validUntil: string;
  };
  status: "OK" | "ERROR";
  message?: string;
}

// Mock implementation - would be replaced with actual API call
export const getVoucherDetails = async (code: string): Promise<VoucherResponse> => {
  console.log(`Fetching voucher details for code: ${code}`);
  
  // This is a mock response based on the API specification
  // In a real implementation, this would be an actual API call
  return {
    voucher: {
      fragmentable: true,
      redeemed: false,
      expired: false,
      isAppointment: true,
      code: code || "18652626117825936623",
      totalValue: 499.00,
      availableValue: 499.00,
      type: "Beratungstermin",
      validUntil: "2028-12-31"
    },
    status: "OK"
  };
};

export const redeemVoucher = async (
  code: string, 
  amount: number
): Promise<VoucherResponse> => {
  console.log(`Redeeming voucher ${code} for amount: ${amount}`);
  
  // Mock implementation - would make an actual API call to redeem
  const voucherDetails = await getVoucherDetails(code);
  
  // Calculate new available value
  const newAvailableValue = voucherDetails.voucher.availableValue - amount;
  const fullyRedeemed = newAvailableValue <= 0;
  
  return {
    voucher: {
      ...voucherDetails.voucher,
      availableValue: Math.max(0, newAvailableValue),
      redeemed: fullyRedeemed
    },
    status: "OK"
  };
};
