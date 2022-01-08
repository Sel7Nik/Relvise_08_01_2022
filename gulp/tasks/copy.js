export const copy = () => {
  return arg.src(arg.path.src.files).pipe(arg.dest(arg.path.build.files))
}
