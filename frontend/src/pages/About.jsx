import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className = 'text-2xl text-center pt-8 border-t'>
        <Title text1 = {'ABOUT'} text2 = {'US'} />
      </div>
      <div className = 'my-10 flex flex-col md:flex-row gap-16'>
        <img className = 'w-full md:max-w-[450px]' src = {assets.about_img} alt = "" />
        <div className = 'flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat ligula quam, vitae efficitur arcu pulvinar nec. Morbi tempus ligula sed nunc maximus fringilla. In hac habitasse platea dictumst. Suspendisse diam ante, vestibulum nec dictum in, ornare in mauris. Aenean efficitur aliquet justo in suscipit. Nulla dictum ex sit amet urna iaculis accumsan. Mauris rutrum eu elit ut egestas. Aliquam erat volutpat. Cras faucibus est quis semper malesuada. Sed at ex mollis turpis feugiat dapibus.</p>
        <p>Curabitur tristique metus vitae nulla porta placerat. Pellentesque in enim et orci sagittis mollis quis ultricies dolor. Sed ut commodo dolor. Ut vitae ante sapien. Vestibulum sit amet mi lacinia, sodales erat ac, efficitur orci. Duis porttitor leo vitae leo pellentesque, ac semper felis ullamcorper. Cras a ante sem. Morbi non tellus ullamcorper, efficitur tortor sed, rutrum velit. Integer quis eros massa.</p>
        <b className = 'text-gray-800'>Our Mission</b>
        <p>Nam sed pulvinar lectus. Cras ullamcorper eu libero egestas ultrices. Sed sollicitudin auctor mauris id porttitor. Vestibulum sed mi sit amet tellus vulputate ultricies. Pellentesque in enim lacus. Sed iaculis odio turpis, et aliquam ex cursus vitae. Vivamus ligula urna, lacinia nec congue vel, aliquet in massa. Quisque dictum elit quis ipsum gravida convallis. Sed consequat enim nec facilisis facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
        </div>
      </div>

      <div className = 'text-xl py-4'>
        <Title text1 = {'WHY'} text2 = {'CHOOSE US'} />
      </div>

      <div className = 'flex flex-col md:flex-row text-sm mb-20'>
        <div className = 'border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className = 'text-gray-600'>Pellentesque quis risus quis mauris volutpat condimentum ornare ac dolor. Vestibulum auctor feugiat tincidunt. Aliquam erat volutpat. Nulla non elit dapibus, aliquet mauris fermentum, rhoncus mi. Mauris placerat odio nec tellus porttitor dapibus. Cras vel felis arcu. Fusce aliquam turpis sed tempus accumsan. Nullam ullamcorper mi quis sapien bibendum varius.</p>
        </div>
        <div className = 'border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className = 'text-gray-600'>Nam sed pulvinar lectus. Cras ullamcorper eu libero egestas ultrices. Sed sollicitudin auctor mauris id porttitor. Vestibulum sed mi sit amet tellus vulputate ultricies. Pellentesque in enim lacus. Sed iaculis odio turpis, et aliquam ex cursus vitae. Vivamus ligula urna, lacinia nec congue vel, aliquet in massa. Quisque dictum elit quis ipsum gravida convallis. Sed consequat enim nec facilisis facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
      </div>
      <div className = 'border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className = 'text-gray-600'>Ut id pulvinar lorem. Nam a hendrerit lacus, ac interdum dui. Mauris ultricies, massa quis dignissim posuere, mi purus pellentesque eros, eu dapibus risus mi ut libero. Morbi ac congue leo. Maecenas tempor purus id malesuada fringilla. Aliquam erat volutpat. Fusce et dolor ante. Ut elementum metus lectus, vel consectetur sapien facilisis eget. Duis efficitur, elit vel fringilla faucibus, ligula ante fermentum eros, sed mollis magna erat eu lectus. In sed lorem quam.</p>
      </div>
      </div>

      <NewsLetterBox />
      
    </div>
  )
}

export default About
