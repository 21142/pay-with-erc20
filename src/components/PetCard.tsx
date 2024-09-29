"use client";

import {
  donationDefaultAmount,
  linkTokenAddress,
  recipientAddress,
} from "@/config/constants";
import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { HeartHandshake, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, type FC } from "react";
import { sepolia } from "viem/chains";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { Button } from "./ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";

type IAnimalCard = {
  id: string;
  title: string;
  body?: string;
  photo?: string;
  variant: string;
  age?: string;
  type?: string;
  breed?: string;
  queryKey?: QueryKey;
};

const PetCard: FC<IAnimalCard> = ({
  id,
  title,
  body,
  photo,
  age,
  breed,
  type,
  queryKey,
}) => {
  const { connectAsync } = useConnect();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [isDonationStarted, setIsDonationStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState("");
  const [tx, setTx] = useState("");

  const queryClient = useQueryClient();

  const handleDonation = async () => {
    try {
      setIsDonationStarted(true);
      setErrors("");

      if (!address) {
        await connectAsync({ chainId: sepolia.id, connector: injected() });
      }

      const data = await writeContractAsync({
        chainId: sepolia.id,
        address: linkTokenAddress,
        functionName: "transfer",
        abi: [
          {
            inputs: [
              { internalType: "address", name: "recipient", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            type: "function",
            name: "transfer",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
          },
        ],
        args: [recipientAddress, donationDefaultAmount],
      });
      setTx(data);
      setCompleted(true);
    } catch (error) {
      console.error(error);
      setErrors("Payment impossible, failed or cancelled.");
      setTimeout(() => {
        setIsDonationStarted(false);
      }, 4000);
    } finally {
      setTimeout(async () => {
        await queryClient.invalidateQueries({ queryKey });
        setIsDonationStarted(false);
      }, 10000);
    }
  };

  const formatPetDetails = (
    age?: string,
    breed?: string,
    type?: string
  ): string => {
    return [age, breed, type].filter(Boolean).join(" • ");
  };

  return (
    <Card
      id="card"
      key={id}
      className={`flex flex-col justify-evenly min-w-[239px] max-w-[350px] border-border/50 shadow-md transition`}
    >
      <>
        <CardHeader className="p-0">
          <Image
            src={photo ?? "/images/no-profile-picture.svg"}
            alt="card__image"
            className="block h-96 max-w-full rounded-t-lg object-cover"
            width="360"
            height="400"
          />
          <CardTitle className="mx-auto flex max-w-[90%] justify-center text-2xl pb-1 pt-5">
            {title}
          </CardTitle>
          <CardDescription className="mx-auto flex max-w-[90%] justify-center">
            {formatPetDetails(age, breed, type)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col overflow-hidden pt-3">
          <p className="text-center">{body}</p>
        </CardContent>
        <CardFooter className="flex relative flex-col cursor-default justify-center gap-y-2">
          <Button
            variant="default"
            onClick={handleDonation}
            size="sm"
            className="flex gap-1 items-center justify-between w-fit"
            disabled={isDonationStarted}
          >
            <span
              className={`peer text-sm text-primary-foreground transition-all ${
                isDonationStarted ? "text-green-500" : ""
              }`}
            >
              {isDonationStarted
                ? "Finalizing..."
                : "Donate for virtual adoption"}
            </span>
            {!isDonationStarted ? (
              <HeartHandshake
                className={`transition-all h-5 w-5 ease-in-out peer-hover:scale-110 peer-hover:cursor-pointer ${
                  isDonationStarted
                    ? "fill-green-500 not-dark:text-green-100"
                    : ""
                }`}
              />
            ) : (
              <Loader2 className="ml-2 h-4 w-4 animate-spin text-green-500" />
            )}
          </Button>
          {completed && isDonationStarted && (
            <div className="flex flex-col items-center justify-center gap-y-2">
              <p className="text-stone-800 absolute top-10 bg-green-200 rounded-md text-sm py-2 px-4">
                Thank you for your donation to {title}
              </p>
              <p className="text-stone-800 font-bold absolute top-20 py-2 px-4 text-sm">
                <a
                  href={`https://sepolia.etherscan.io/tx/${tx}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Inspect transaction{" "}
                </a>
              </p>
            </div>
          )}
          {errors && isDonationStarted && (
            <p className="text-stone-800 absolute top-10 bg-red-200 rounded-md text-sm py-2 px-4">
              {errors}
            </p>
          )}
        </CardFooter>
      </>
    </Card>
  );
};

export default PetCard;
