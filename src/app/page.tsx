"use client";

import PetCard from "@/components/PetCard";
import { linkTokenAddress, recipientAddress } from "@/config/constants";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { sepolia } from "viem/chains";
import { useReadContract } from "wagmi";

export default function Home() {
  const [donations, setDonation] = useState(0);
  const [network, setNetwork] = useState<number | undefined>(undefined);
  const {
    data: balance,
    isLoading,
    queryKey,
  } = useReadContract({
    address: linkTokenAddress,
    functionName: "balanceOf",
    abi: erc20Abi,
    args: [recipientAddress],
  });

  /*
   * use of this hook with currencies other than native is deprecated and for that useReadContract is used
   * https://wagmi.sh/react/guides/migrate-from-v1-to-v2#deprecated-usebalance-token-parameter
   */
  // const { data: balanceResult } = useBalance({
  //   address: recipientAddress,
  //   token: linkTokenAddress,
  // });

  useEffect(() => {
    if (balance) {
      setDonation(Number(balance) / 1e18);
    }
  }, [balance]);

  return (
    <>
      <h1 className="p-2 text-4xl sm:text-5xl font-extrabold leading-[1.25] text-foreground max-w-6xl mx-auto text-center pt-8 md:pt-20">
        {network !== undefined && network !== sepolia.id && (
          <p className="text-red-600 text-xl border-b-2 border-red-600 w-fit mx-auto mb-4">
            !!! We currently only support Sepolia Testnet !!!
          </p>
        )}
        <span className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-800 bg-clip-text text-transparent">
          Donate for virtual adoption using ERC20 tokens
        </span>
      </h1>
      <div className="flex items-center justify-center text-2xl sm:text-3xl font-bold leading-[1.25] text-foreground max-w-6xl mx-auto text-center pt-8 md:pt-20 h-24">
        {isLoading ? (
          <Loader2 className="h-10 w-10 animate-spin text-fuchsia-500" />
        ) : (
          <p className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-800 bg-clip-text text-transparent">
            Total donations: {donations} LINK
            {/* Total donations: {Number(balanceResult?.value) / 1e18} {balanceResult?.symbol} */}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 max-w-7xl lg:grid-cols-3 gap-y-6 gap-6 items-center justify-items-center mx-auto p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <PetCard
          id="1"
          photo="https://utfs.io/f/4c5ccd05-17f8-4966-892c-3194855a86b3-1jf5hd.jpeg"
          title="Armin"
          body="A cute doggo looking for food and a new home."
          variant="default"
          age="2 years"
          breed="Husky"
          type="Dog"
          queryKey={queryKey}
          setNetwork={setNetwork}
        />
        <PetCard
          id="2"
          title="Noah"
          photo="https://utfs.io/f/f97ccdec-c8cc-4fe0-8785-28d7bfc85da6-235mz.jpg"
          body="A fluffy kitty looking for snacks and toys."
          variant="default"
          age="1 year"
          breed="Persian"
          type="Cat"
          setNetwork={setNetwork}
          queryKey={queryKey}
        />
        <PetCard
          id="3"
          title="Benny"
          photo="https://utfs.io/f/242f33d0-f8bf-4c18-8c6d-5ab07eabf863-12594m.jpeg"
          body="A fluffy cocker looking for treats and a new home."
          variant="default"
          age="6 months"
          breed="Cocker Spaniel"
          type="Dog"
          setNetwork={setNetwork}
          queryKey={queryKey}
        />
      </div>
    </>
  );
}
