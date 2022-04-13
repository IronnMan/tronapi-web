import { DefaultFooter } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import { LINK } from '@/configs/links';
import { GithubOutlined } from '@ant-design/icons';

export default () => {
  const { initialState } = useModel('@@initialState');
  const { name }: any = initialState?.settings;
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${name}`}
      links={[
        {
          key: 'api',
          title: '接口文档',
          href: LINK.API,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: LINK.GITHUB,
          blankTarget: true,
        },
        {
          key: 'faq',
          title: '常见问题',
          href: LINK.FAQ,
          blankTarget: true,
        },
      ]}
    />
  );
};
