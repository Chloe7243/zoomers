import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { IoCloseCircle, IoImages } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { displayErrorMessage, imgToBase64 } from "@/utils/functions";
import { useAddNewPostMutation, useEditPostMutation } from "@/services/users";
import { Textarea } from "./ui/textarea";
import { MdOutlineGifBox } from "react-icons/md";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { ChangeEvent, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import GiphySearch from "./GiphySearch";
import Loader from "./Loader";

const formSchema = z.object({
  content: z.string().max(430, {
    message: "You've exceeded the number of allocated characters",
  }),
  media: z.string().optional(),
});

const PostForm = ({
  media,
  postId,
  content,
  formType = "add",
}: {
  content?: string;
  media?: string;
  formType?: "edit" | "add";
  postId?: string;
}) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [textContent, setTextContent] = useState(content || "");
  const [editPost, { isLoading: editingPost }] = useEditPostMutation();
  const [imgPreview, setImgPreview] = useState<string | null>(media || null);
  const [createPost, { isLoading: addingPost }] = useAddNewPostMutation();

  const isLoading = addingPost || editingPost;

  // if (content) {
  //   form.setValue("content", content);
  // }

  // if (media) {
  //   form.setValue("media", media);
  // }

  const resetMediaValue = () => {
    setImgPreview(null);
    form.setValue("media", undefined);
  };

  const setMediaValue = (url: string) => {
    setImgPreview(url);
    form.setValue("media", url);
  };

  const handleMediaUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (event.target) event.target.value = "";
    if (file) {
      imgToBase64(file, (url) => {
        setMediaValue(url);
      });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLoading || (formType == "edit" && !postId)) return;
    try {
      formType === "edit" && postId
        ? await editPost({ id: postId, ...values }).unwrap()
        : await createPost(values).unwrap();
      toast.success("You just made a post");
      form.reset({ content: "", media: undefined });
      setImgPreview(null);
      setTimeout(() => navigate("/explore"), 0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      displayErrorMessage(error);
    }
  }

  return (
    <DrawerContent className=" top-0 px-3 !rounded-t-primary !h-[calc(100%_-_4rem)] mt-16">
      <DrawerHeader>
        <DrawerTitle>What's happening?</DrawerTitle>
      </DrawerHeader>
      <div className="flex flex-col gap-1 flex-1 px-3 overflow-y-auto">
        {" "}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex justify-between flex-col gap-4 max-h-[39%] h-max min-h-30"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormControl className="grow-wrap">
                    <Textarea
                      className="h-full resize-none max-h-full"
                      placeholder="Give us the tea"
                      {...field}
                      onChange={(e) => {
                        setTextContent(e.target.value);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex justify-between gap-2 items-center">
          {" "}
          <ToggleGroup
            type="single"
            className="justify-end gap-3 mt-2"
            // onValueChange={resetMediaValue}
          >
            <ToggleGroupItem value="img" className="relative px-0 h-max">
              <Input
                value={""}
                type="file"
                className="absolute left-0 h-max p-1 right-[-.5rem] border-0 w-full bg-transparent z-10 after:content-['h'] after:bg-black after:w-full after:h-full after:absolute after:p-1 post-image"
                accept="image/*"
                onChange={(e) => handleMediaUpload(e)}
              />
              <IoImages size={22} className="relative bg-background" />
            </ToggleGroupItem>
            <ToggleGroupItem value="gif" className="h-max p-0 bg-transparent">
              <Popover>
                <PopoverTrigger>
                  {" "}
                  <MdOutlineGifBox size={25} />
                </PopoverTrigger>
                <PopoverContent className="w-full h-full giphy" side="bottom">
                  <GiphySearch onSelect={setMediaValue} />
                </PopoverContent>
              </Popover>
            </ToggleGroupItem>
          </ToggleGroup>
          <p className="float-right text-sm">
            <span
              className={`font-semibold ${
                textContent?.length > 430 ? "text-red-900 " : ""
              }`}
            >
              {textContent?.length}
            </span>{" "}
            / 430
          </p>
        </div>
        <div className="h-max max-h-64 flex items-center justify-center mt-4">
          {imgPreview && (
            <div className="h-full relative">
              <img className="h-full" src={imgPreview} alt="" />
              <IoCloseCircle
                size={20}
                onClick={resetMediaValue}
                className="absolute top-[-.5rem] right-[-.5rem] fill-slate-950 bg-white rounded-full"
              />
            </div>
          )}
        </div>
      </div>
      <DrawerFooter className="flex-row gap-4">
        <Button
          className="capitalize"
          onClick={() => {
            onSubmit(form.getValues());
          }}
        >
          {isLoading ? <Loader size={14} /> : `${formType} Post`}
        </Button>
        <DrawerClose>
          <Button variant="outline" className="w-full">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default PostForm;
