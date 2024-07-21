"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

const Home = () => {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-slate-200">
        <section className="text-center mb-8 md:mb-12">
          <h6 className="text-2xl md:text-2xl font-bold text-red-500">
            "Unveil the secrets of the universe with Hidden Whispers , your
            portal to enigmatic stories and mysteries untold."
          </h6>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-blue-500">
            Explore Hidden Whispers-; "Where You Identity Remains A Secret.""
          </p>
        </section>
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-xs"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardHeader className="text-black-500 font-bold bg-red-200">
                      {message.title}
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-6 bg-gray-300">
                      <span className="text-lg font-italic text-violet-700">
                        {message.content}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
      <footer className="text-center p-4 md:p-6">
        © 2024 Hidden Whispers. All Right Reserved.
      </footer>
    </>
  );
};

export default Home;
