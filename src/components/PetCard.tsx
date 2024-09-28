"use client";

import { HeartHandshake } from "lucide-react";
import Image from "next/image";
import { useState, type FC } from "react";
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
};

const PetCard: FC<IAnimalCard> = ({
  id,
  title,
  body,
  photo,
  age,
  breed,
  type,
}) => {
  const [isDonationClicked, setIsDonationClicked] = useState(false);

  const handleDonationClick = () => {
    console.log("TODO: handle donation for", title);
    setIsDonationClicked((prev) => !prev);
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
      className={`flex flex-col h-[600px] min-w-[239px] max-w-[350px] border-0 border-none shadow-md transition`}
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
        <CardFooter className="flex cursor-default justify-center gap-2">
          <Button
            variant="default"
            onClick={handleDonationClick}
            size="sm"
            className="flex gap-1 items-center justify-between w-fit"
          >
            <span
              className={`peer text-sm text-primary-foreground transition-all ${
                isDonationClicked ? "text-green-500" : ""
              }`}
            >
              Donate for virtual adoption
            </span>
            <HeartHandshake
              className={`transition-all h-5 w-5 ease-in-out peer-hover:scale-110 peer-hover:cursor-pointer ${
                isDonationClicked ? "fill-green-500 text-green-100" : ""
              }`}
            />
          </Button>
        </CardFooter>
      </>
    </Card>
  );
};

export default PetCard;
