import { HOME_VIDEO_SRC } from "@/constants/videos";

export default function HomeVideoPage() {
  return (
    <video
      autoPlay
      muted
      playsInline
      loop
      className="w-full max-w-[53rem] h-[30rem] object-fill rounded-base"
    >
      <source
        src={HOME_VIDEO_SRC}
        type="video/mp4"
      />
      <track kind="captions" src="סרטון תדמית על הארגון שעה של פוקוס" />
    </video>
  );
}
