"use client";

import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { toast } from "sonner";

interface CameraProps {
  onCapture: (photo: string) => void;
}

export function Camera({ onCapture }: CameraProps) {
  const webcamRef = useRef<Webcam>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    } else {
      toast.error("Failed to capture image. Please try again.");
    }
  }, []); // Empty dependency array since webcamRef doesn't change

  const retake = () => {
    setCapturedImage(null);
  };

  const accept = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      setCapturedImage(null);
      setIsOpen(false);
      toast.success("Photo captured successfully!");
    }
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="w-full py-8 text-lg font-medium"
      >
        Take a Picture
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Take a Picture</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {!capturedImage ? (
              <div className="relative">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="w-full rounded-md"
                />
                <Button
                  onClick={capture}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  size="lg"
                  variant="secondary"
                >
                  Capture
                </Button>
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full rounded-md"
                  />
                  <div className="flex justify-between p-4">
                    <Button onClick={retake} variant="outline">Retake</Button>
                    <Button onClick={accept}>Use This Photo</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
